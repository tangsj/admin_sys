<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;

class serviceController extends Controller
{ 
    /**
     * 检查机构名称是否可用
     * @param string $name 机构名称
     * @param int $id 更新检查时排除本身
     * @return [type] [description]
     */
    private function checkNameUsed($name, $id = -1){
      $query = DB::table('service')->where('name', $name);

      if($id != -1){
        $query->where('id', '<>', $id);
      }
      return $query->count() == 0 ? false : true;
    }
    /**
     * 根据ID获取服务机构信息
     * @param  Request $request [description]
     * @param  [type]  $id      [description]
     * @return [type]           [description]
     */
    public function get(Request $request, $id){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $service = DB::table('service')->where('id', '=', $id)->get();

      $res['code'] = 1;
      $res['data'] = $service;
      $res['message'] = '查询成功';

      return response()->json($res);
    }
    /**
     * 获取所有服务机构列表
     * @return [type] [description]
     */
    public function all(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $services = DB::table('service')
                  ->select('id as key', 'name', 'desc')
                  ->orderBy('created', 'desc')
                  ->get();

      $res['code'] = 1;
      $res['message'] = '查询成功';
      $res['data'] = $services;

      return response()->json($res);
    }
    /**
     * 获取服务机构列表 带分页
     * @return [type] [description]
     */
    public function list(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $page = $request -> input('page', 1);
      $pageSize = $request -> input('pageSize', 10);

      $count = DB::table('service')->count();
      $services = DB::table('service')
                  ->select('id as key', 'name', 'desc')
                  ->orderBy('created', 'desc')
                  ->skip(($page-1) * $pageSize)
                  ->take($pageSize)
                  ->get();

      $res['code'] = 1;
      $res['message'] = '查询成功';
      $res['data'] = array(
        'count' => $count,
        'page' => $page,
        'pageSize' => $pageSize,
        'list' => $services
      );

      return response()->json($res);
    }

    /**
     * 添加服务机构
     * @param Request $request [description]
     */
    public function add(Request $request){

      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      if(!$request->has('name')){
        $res['code'] = -1;
        $res['message'] = '请提供机构名称';
        return response()->json($res);
      }

      if(self::checkNameUsed($request->name)){
        $res['code'] = -1;
        $res['message'] = '机构名称已被使用';
      }else{
        $id = DB::table('service')->insertGetId([
          'name' => $request->name,
          'desc' => $request->desc,
          'created' => date('Y-m-d H:i:s', time())
        ]);

        $res['code'] = 1;
        $res['data'] = $id;
        $res['message'] = '机构添加成功';
      }

      return response()->json($res);
    }

    /**
     * 根据ID删除服务机构
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function del(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      if(!$request->has('ids')){
        $res['code'] = -1;
        $res['message'] = '请提供机构ID数组';
        return response()->json($res);
      }

      $rows = DB::table('service')->whereIn('id', $request->ids)->delete();

      if($rows > 0){
        $res = [
          'code' => 1,
          'message' => '删除成功！',
          'data' => $request->ids
        ];
      }else{
        $res = [
          'code' => 0,
          'message' => '删除失败！',
          'data' => $request->ids
        ];
      }

      return response()->json($res);
    }

    /**
     * 修改服务机构
     * @param  Request $request [description]
     * @param  [type]  $id      [description]
     * @return [type]           [description]
     */
    public function edit(Request $request, $id){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      if(!$request->has('name')){
        $res['code'] = -1;
        $res['message'] = '请提供机构名称';
        return response()->json($res);
      }

      if(self::checkNameUsed($request->name, $id)){
        $res['code'] = -1;
        $res['message'] = '机构名称已被使用';
      }else{
        $up = DB::table('service')
            ->where('id', $id)
            ->update([
              'name' => $request->name,
              'desc' => $request->desc
            ]);

        $res = [
          'code' => 1,
          'message' => '更新成功！',
          'data' => $up
        ];
      }
      return response()->json($res);
    }
}

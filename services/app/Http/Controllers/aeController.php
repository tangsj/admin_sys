<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class aeController extends Controller
{
    /**
     * 根据ID获取 AE 信息
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

      $ae = DB::table('ae')->where('id', '=', $id)->get();

      $res['code'] = 1;
      $res['data'] = $ae;
      $res['message'] = '查询成功';

      return response()->json($res);
    }

    /**
     * 添加 AE 人员
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
        $res['message'] = '姓名不能为空';
        return response()->json($res);
      }

      if(!$request->has('phone')){
        $res['code'] = -1;
        $res['message'] = '电话不能为空';
        return response()->json($res);
      }

      if(!$request->has('serviceid')){
        $res['code'] = -1;
        $res['message'] = '服务机构不能为空';
        return response()->json($res);
      }

      $id = DB::table('ae')->insertGetId([
        'name' => $request->name,
        'enname' => $request->input('enname', ''),
        'phone' => $request->phone,
        'serviceid' => $request->serviceid,
        'created' => date('Y-m-d H:i:s', time())
      ]);

      $res['code'] = 1;
      $res['data'] = $id;
      $res['message'] = '机构添加成功';

      return response()->json($res);
    }

    /**
     * 查询 AE 列表 带分页
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function list(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $page = $request -> input('page', 1);
      $pageSize = $request -> input('pageSize', 10);

      $count = DB::table('ae')->count();
      $aes = DB::table('ae')
                  ->leftJoin('service', 'ae.serviceid', '=', 'service.id')
                  ->select('ae.id as key', 'ae.name', 'ae.enname', 'ae.phone', 'ae.serviceid', 'service.name as servicename')
                  ->orderBy('ae.created', 'desc')
                  ->skip(($page-1) * $pageSize)
                  ->take($pageSize)
                  ->get();

      $res['code'] = 1;
      $res['message'] = '查询成功';
      $res['data'] = array(
        'count' => $count,
        'page' => $page,
        'pageSize' => $pageSize,
        'list' => $aes
      );

      return response()->json($res);
    }

    /**
     * 根据ID删除AE
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
        $res['message'] = '请提供AE ID数组';
        return response()->json($res);
      }

      $res = DB::table('ae')->whereIn('id', $request->ids)->delete();

      $res = [
        'code' => 1,
        'message' => '删除成功！',
        'data' => $request->ids
      ];

      return response()->json($res);
    }

    /**
     * 修改AE人员
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
        $res['message'] = '姓名不能为空';
        return response()->json($res);
      }

      if(!$request->has('phone')){
        $res['code'] = -1;
        $res['message'] = '电话不能为空';
        return response()->json($res);
      }

      if(!$request->has('serviceid')){
        $res['code'] = -1;
        $res['message'] = '服务机构不能为空';
        return response()->json($res);
      }

      $up = DB::table('ae')
          ->where('id', $id)
          ->update([
            'name' => $request->name,
            'enname' => $request->input('enname', ''),
            'phone' => $request->phone,
            'serviceid' => $request->serviceid
          ]);

      $res = [
        'code' => 1,
        'message' => '更新成功！',
        'data' => $up
      ];
      return response()->json($res);
    }
}

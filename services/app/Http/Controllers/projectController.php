<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class projectController extends Controller
{
    /**
     * 根据ID获取 项目 信息
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

      $ae = DB::table('project')->where('id', '=', $id)->get();

      $res['code'] = 1;
      $res['data'] = $ae;
      $res['message'] = '查询成功';

      return response()->json($res);
    }

    /**
     * 添加项目
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
        $res['message'] = '请提供项目名称';
        return response()->json($res);
      }

      if(!$request->has('serviceid')){
        $res['code'] = -1;
        $res['message'] = '请提供项目所属服务机构';
        return response()->json($res);
      }

      $id = DB::table('project')->insertGetId([
        'name' => $request->name,
        'serviceid' => $request->serviceid,
        'description' => $request->input('description', ''),
        'status' => 0,
        'created' => date('Y-m-d H:i:s', time())
      ]);

      $res['code'] = 1;
      $res['data'] = $id;
      $res['message'] = '项目添加成功';

      return response()->json($res);
    }

    /**
     * 查询项目列表 带分页
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

      $count = DB::table('project')->count();
      $projects = DB::table('project')
                  ->leftJoin('service', 'project.serviceid', '=', 'service.id')
                  ->select('project.id as key', 'project.name', 'project.description', 'project.serviceid', 'service.name as servicename')
                  ->orderBy('project.created', 'desc')
                  ->skip(($page-1) * $pageSize)
                  ->take($pageSize)
                  ->get();

      $res['code'] = 1;
      $res['message'] = '查询成功';
      $res['data'] = array(
        'count' => $count,
        'page' => $page,
        'pageSize' => $pageSize,
        'list' => $projects
      );

      return response()->json($res);
    }

    /**
     * 获取所有项目列表
     * @return [type] [description]
     */
    public function all(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $services = DB::table('project')
                  ->leftJoin('service', 'project.serviceid', '=', 'service.id')
                  ->select('project.id as key', 'project.name', 'project.description', 'project.serviceid', 'service.name as servicename')
                  ->orderBy('project.created', 'desc')
                  ->get();

      $res['code'] = 1;
      $res['message'] = '查询成功';
      $res['data'] = $services;

      return response()->json($res);
    }

    /**
     * 根据ID删除项目
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
        $res['message'] = '请提供项目ID数组';
        return response()->json($res);
      }

      $rows = DB::table('project')->whereIn('id', $request->ids)->delete();

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
     * 修改项目
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
        $res['message'] = '项目名称不能为空';
        return response()->json($res);
      }

      if(!$request->has('serviceid')){
        $res['code'] = -1;
        $res['message'] = '服务机构不能为空';
        return response()->json($res);
      }

      $up = DB::table('project')
          ->where('id', $id)
          ->update([
            'name' => $request->name,
            'description' => $request->input('description', ''),
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

<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;

class serviceController extends Controller
{
    /**
     * 获取服务机构列表
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

      $id = DB::table('service')->insertGetId([
        'name' => $request->name,
        'desc' => $request->desc,
        'created' => date('Y-m-d H:i:s', time())
      ]);

      $res['code'] = 1;
      $res['data'] = $id;
      $res['message'] = '机构添加成功';

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

      $res = DB::table('service')->whereIn('id', $request->ids)->delete();

      $res = [
        'code' => 1,
        'message' => '删除成功！',
        'data' => $request->ids
      ];

      return response()->json($res);
    }
}

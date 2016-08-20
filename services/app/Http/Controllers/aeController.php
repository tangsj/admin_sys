<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class aeController extends Controller
{
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
}

<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class plineController extends Controller
{
    /**
     * 添加项目流水
     * @param Request $request [description]
     */
    public function add(Request $request){

      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      if(!$request->has('title')){
        $res['code'] = -1;
        $res['message'] = '请提供项目流水标题';
        return response()->json($res);
      }

      if(!$request->has('description')){
        $res['code'] = -1;
        $res['message'] = '请提供流水描述';
        return response()->json($res);
      }

      if(!$request->has('pid')){
        $res['code'] = -1;
        $res['message'] = '请提供流水所属项目';
        return response()->json($res);
      }

      if(!$request->has('aeid')){
        $res['code'] = -1;
        $res['message'] = '请提供流水对应AE';
        return response()->json($res);
      }

      if(!$request->has('startTime')){
        $res['code'] = -1;
        $res['message'] = '请提供开始时间';
        return response()->json($res);
      }

      if(!$request->has('endTime')){
        $res['code'] = -1;
        $res['message'] = '请提供结束时间';
        return response()->json($res);
      }

      if(!$request->has('useHour')){
        $res['code'] = -1;
        $res['message'] = '请提供实际耗时';
        return response()->json($res);
      }

      if(!$request->has('charge')){
        $res['code'] = -1;
        $res['message'] = '请提供负责人姓名';
        return response()->json($res);
      }

      if(!$request->has('status')){
        $res['code'] = -1;
        $res['message'] = '请提供当前状态';
        return response()->json($res);
      }

      $id = DB::table('project_line')->insertGetId([
        'title' => $request->title,
        'description' => $request->description,
        'pid' => $request->pid,
        'aeid' => $request->aeid,
        'startTime' => $request->startTime,
        'endTime' => $request->endTime,
        'useHour' => $request->useHour,
        'charge' => $request->charge,
        'status' => $request->status,
        'created' => date('Y-m-d H:i:s', time())
      ]);

      $res['code'] = 1;
      $res['data'] = $id;
      $res['message'] = '流水添加成功';

      return response()->json($res);
    }
}

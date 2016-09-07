<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class plineController extends Controller
{
    /**
     * 查询项目流水列表 带分页
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function getList(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $page = $request -> input('page', 1);
      $pageSize = $request -> input('pageSize', 10);

      $count = DB::table('project_line')->count();
      $projects = DB::table('project_line')
                  ->leftJoin('ae', 'project_line.aeid', '=', 'ae.id')
                  ->leftJoin('project', 'project_line.pid', '=', 'project.id')
                  ->select('project_line.id as key', 'project_line.title', 'project_line.pid', 'project.name as pname',  'project_line.aeid', 'ae.name as aename', 'project_line.startTime', 'project_line.endTime', 'project_line.useHour', 'project_line.charge')
                  ->orderBy('project_line.created', 'desc')
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
     * 根据ID删除项目流水
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
        $res['message'] = '请提供项目流水ID数组';
        return response()->json($res);
      }

      // 删除 描述表
      DB::table('project_line_desc')->whereIn('plineid', $request->ids)->delete();
      // 删除 主表
      DB::table('project_line')->whereIn('id', $request->ids)->delete();

      $res = [
        'code' => 1,
        'message' => '删除成功！',
        'data' => $request->ids
      ];

      return response()->json($res);
    }

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


      DB::transaction(function () {
        global $request;

        $id = DB::table('project_line')->insertGetId([
          'title' => $request->title,
          'pid' => $request->pid,
          'aeid' => $request->aeid,
          'startTime' => $request->startTime,
          'endTime' => $request->endTime,
          'useHour' => $request->useHour,
          'charge' => $request->charge,
          'created' => date('Y-m-d H:i:s', time())
        ]);

        foreach ($request->description as $desc) {
          DB::table('project_line_desc')->insert([
            'text' => $desc,
            'plineid' => $id,
            'created' => date('Y-m-d H:i:s', time())
          ]);
        }
      });

      $res['code'] = 1;
      $res['data'] = [];
      $res['message'] = '流水添加成功';

      return response()->json($res);
    }

    /**
     * 根据ID获取流水描述列表
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function getDescById(Request $request, $id){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $descs = DB::table('project_line_desc')->where('plineid', $id)->get();

      $res = [
        'code' => 1,
        'message' => '查询成功',
        'data' => $descs
      ];

      return response()->json($res);
    }

    /**
     * 设置流水描述价格
     * @param $request-prices 格式 ： ID|价格  多行数据用,号隔开  如："23|1,24|2"
     * @param Request $request [description]
     */
    public function setPrice(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      if(!$request->has('prices')){
        $res['code'] = -1;
        $res['message'] = '请提供项目流水标题';
        return response()->json($res);
      }

      $prices = explode(',', $request->prices);
      foreach($prices as $row){
        $temp = explode('|', $row);

        DB::table('project_line_desc')
            ->where('id', $temp[0])
            ->update(['money' => $temp[1]]);
      }

      $res = [
        'code' => 1,
        'message' => '价格更新成功',
        'data' => []
      ];

      return response()->json($res);
    }
}

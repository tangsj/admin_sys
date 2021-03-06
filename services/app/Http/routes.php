<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

/**
 * API 路由组
 * cros 添加Access-Control-Allow-Origin
 */
Route::group(['middleware' => 'cros'], function(){
  /**
   * 在VerifyCsrfToken中添加csrf排除
   */
  // 用户登录
  Route::post('login', 'userController@login');
  Route::post('login/refresh', 'userController@refreshLogin');

  Route::group(['middleware' => 'jwt'], function(){
    /* 服务机构相关 */
    // 根据ID获取一条服务机构信息
    Route::get('api/service/get/{id}', 'serviceController@get');
    // 获取全部服务机构列表
    Route::get('api/service/all', 'serviceController@all');
    // 获取服务机构列表 带分页信息
    Route::get('api/service/list', 'serviceController@getList');
    // 添加服务机构
    Route::post('api/service/add', 'serviceController@add');
    // 删除服务机构
    Route::post('api/service/del', 'serviceController@del');
    // 修改服务机构
    Route::post('api/service/edit/{id}', 'serviceController@edit');

    /* AE 相关 */
    // 根据ID获取一条AE信息
    Route::get('api/ae/get/{id}', 'aeController@get');
    // 获取全部AE列表
    Route::get('api/ae/all', 'aeController@all');
    // 获取AE列表 带分页信息
    Route::get('api/ae/list', 'aeController@getList');
    // 添加 AE 人员
    Route::post('api/ae/add', 'aeController@add');
    // 删除 AE
    Route::post('api/ae/del', 'aeController@del');
    // 修改 AE
    Route::post('api/ae/edit/{id}', 'aeController@edit');

    /* 项目 相关 */
    // 根据ID获取一条项目信息
    Route::get('api/project/get/{id}', 'projectController@get');
    // 获取全部项目列表
    Route::get('api/project/all', 'projectController@all');
    // 获取项目列表 带分页信息
    Route::get('api/project/list', 'projectController@getList');
    // 添加项目
    Route::post('api/project/add', 'projectController@add');
    // 删除项目
    Route::post('api/project/del', 'projectController@del');
    // 修改项目
    Route::post('api/project/edit/{id}', 'projectController@edit');

    /* 项目流水 相关 */
    // 获取项目流水列表 带分页信息
    Route::get('api/pline/list', 'plineController@getList');
    // 获取ID对应的流水描述信息
    Route::get('api/pline/desc/{id}', 'plineController@getDescById');
    // 添加项目流水
    Route::post('api/pline/add', 'plineController@add');
    // 删除项目流水
    Route::post('api/pline/del', 'plineController@del');
    // 设置价格
    Route::post('api/pline/setprice', 'plineController@setPrice');
  });
});

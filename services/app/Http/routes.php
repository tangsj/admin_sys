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

  // 根据ID获取一条服务机构信息
  Route::get('api/service/get/{id}', 'serviceController@get');
  // 获取服务机构列表
  Route::get('api/service/list', 'serviceController@list');
  // 添加服务机构
  Route::post('api/service/add', 'serviceController@add');
  // 删除服务机构
  Route::post('api/service/del', 'serviceController@del');
  // 修改服务机构
  Route::post('api/service/edit/{id}', 'serviceController@edit');
});

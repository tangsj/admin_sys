<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;

use App\Http\Requests;

class userController extends Controller
{
    /**
     * 生成jwt
     * @return [type] [description]
     */
    private function getToken($uid){
      $signer = new Sha256();
      $token = (new Builder())
              // ->setIssuer('http://example.com') // Configures the issuer (iss claim)
              // ->setAudience('http://example.org') // Configures the audience (aud claim)
              // ->setId('4f1g23a12aa', true) // Configures the id (jti claim), replicating as a header item
              // ->setIssuedAt(time()) // Configures the time that the token was issue (iat claim)
              // ->setNotBefore(time() + 60) // Configures the time that the token can be used (nbf claim)
              // ->setExpiration(time() + 3600) // Configures the expiration time of the token (nbf claim)
              ->set('uid', $uid) // Configures a new claim, called "uid"
              ->sign($signer, env('JWT_SIGN')) // creates a signature using "testing" as key
              ->getToken(); // Retrieves the generated token
      return $token;
    }

    /**
     * 根据ID 获取登录用户信息
     * @param  [type] $uid [description]
     * @return [type]      [description]
     */
    private function getUserById($uid){
      $user = DB::table('user')
          ->select('id as key', 'username', 'name', 'phone')
          ->where('id', '=', $uid)
          ->get();

      return $user;
    }

    /**
     * 用户登录
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function login(Request $request){
      $res = [
        'code' => 0,
        'message' => '登录失败',
        'data' => []
      ];

      if(!$request->has('username')){
        $res['code'] = -1;
        $res['message'] = '请提供账号';
        return response()->json($res);
      }

      if(!$request->has('password')){
        $res['code'] = -1;
        $res['message'] = '请提供密码';
        return response()->json($res);
      }

      $user = DB::table('user')
          ->select('id as key', 'username', 'name', 'phone')
          ->where('username', '=', $request->username)
          ->where('password', '=', md5($request->password))
          ->get();

      if(count($user) == 1){
        // 生成token
        $token = (string)self::getToken($user[0]->key);

        $res['code'] = 1;
        $res['data'] = array(
          'user' => $user[0],
          'token' => $token,
        );
        $res['message'] = '登录成功';
      }
      return response()->json($res);
    }

    /**
     * 刷新客户端用户登录
     * @return [type] [description]
     */
    public function refreshLogin(Request $request){
      $res = [
        'code' => 0,
        'message' => '',
        'data' => []
      ];

      $tokenstring = $request->token;
      $token = (new Parser())->parse((string) $tokenstring);
      $uid = $token->getClaim('uid');

      // 根据uid获取用户信息
      $user = self::getUserById($uid);

      if(count($user) == 1){
        $res['code'] = 1;
        $res['message'] = '获取成功';
        $res['data'] = $user[0];
      }

      return response()->json($res);
    }
}

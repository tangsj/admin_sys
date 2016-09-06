<?php

namespace App\Http\Middleware;

use Closure;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $res = [
            'code' => 403,
            'message' => '无权访问',
            'data' => []
        ];
        if($request->has('_token')){
            //验证token签名
            $token = $request->input('_token');
            $signer = new Sha256();
            $token = (new Parser())->parse((string) $token);
            if($token->verify($signer, env('JWT_SIGN'))){
                // 验证通过
                return $next($request);
            }
        }

        return response()->json($res);
    }
}

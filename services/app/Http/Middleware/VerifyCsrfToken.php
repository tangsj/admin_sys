<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
        // 'api/*'
     *
     * @var array
     */
    protected $except = [
      'login',
      'login/refresh',
      'api/*'
    ];
}

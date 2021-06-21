<?php

namespace App\Utils;

use Exception;
use Firebase\JWT\JWT as JWTJWT;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JWT
{
    private static function bearerToken(Request $request) {
        $header = $request->header('Authorization');
        if (Str::startsWith($header, 'Bearer')) {
            return Str::substr($header, 7);
        }
        return null;
    }
    public static function authorize(Request $request) {
        $jwt = JWT::bearerToken($request);
        if (!$jwt) {
            return null;
        } else {
            try {
                $data = JWTJWT::decode($jwt, env('JWT_SECRET'), array('HS256'));
                return $data;
            } catch (Exception $e) {
                return null;
            }
        }
    }
}

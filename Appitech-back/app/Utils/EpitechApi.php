<?php

namespace App\Utils;

use Illuminate\Support\Facades\Http;

class EpitechApi
{
    public static function get($path, String $data, String $params = "") {
        $url = "https://intra.epitech.eu/".$data."/".$path."?format=json".$params;
        $response = Http::withOptions([
            'verify' => false,
        ])->get($url);
        return $response->json();
    }

    public static function post() {

    }

    public static function encrypt($autologin) {
        $ciphering = "AES-128-CTR";
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $encryption_iv = '1234567891011121';
        $encryption_key = "appitech";

        $encryption = openssl_encrypt($autologin, $ciphering,
            $encryption_key, $options, $encryption_iv);
        return $encryption;
    }
    public static function decrypt($autologin) {
        $ciphering = "AES-128-CTR";
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $encryption_iv = '1234567891011121';
        $encryption_key = "appitech";

        $encryption = openssl_decrypt($autologin, $ciphering,
            $encryption_key, $options, $encryption_iv);
        return $encryption;
    }
}

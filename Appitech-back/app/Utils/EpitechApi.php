<?php

namespace App\Utils;

use Illuminate\Support\Facades\Http;

class EpitechApi
{
    public static function get($path, Array $data) {
        $url = "https://intra.epitech.eu/".$data['autologin']."/".$path."?format=json";
        $response = Http::withOptions([
            'verify' => false,
        ])->get($url);
        return $response->json();
    }

    public static function post() {

    }
}

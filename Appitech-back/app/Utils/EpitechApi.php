<?php

namespace App\Utils;

use Illuminate\Support\Facades\Http;

class EpitechApi
{
    public static function get($path, String $data) {
        $url = "https://intra.epitech.eu/".$data."/".$path."?format=json";
        $response = Http::withOptions([
            'verify' => false,
        ])->get($url);
        return $response->json();
    }

    public static function post() {

    }
}

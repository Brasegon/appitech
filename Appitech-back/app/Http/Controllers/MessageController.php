<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Utils\EpitechApi;
use App\Utils\JWT as UtilsJWT;
use App\Utils\Message;
use Exception;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MessageController extends Controller
{
    public function getMessages (Request $request) {
        // $path = "/user";
        // $jwtData = UtilsJWT::authorize($request);
        // if (is_null($jwtData)) {
        //     return Message::createMessage(403, "Pas autorisé");
        // }
        // $jwtData = (array) $jwtData;
        // $user = User::firstWhere('login', $jwtData['login']);
        // $info = EpitechApi::get($path, $user->autologin);
        // $info = (array) $info;
        // $logTime = EpitechApi::get('/user/'.$info['login']."/netsoul", $user->autologin);
        // $len = count($logTime);
        // $info['logtime'] = [];
        // $info['notes'] = $this->getNotes($info, $user);
        // $labels = [];
        // $datasets = [
        //     array(
        //         "data" => [],
        //         "strokeWidth" => 2,
        //         "total" => 0
        //     )
        //     ];
        // for ($i = $len - 7, $z = 0; $z < 7; $i += 1, $z += 1) {
        //     $time = new \Moment\Moment($logTime[$i][0]);
        //     array_push($labels, $time->format("DD/MM", new \Moment\CustomFormats\MomentJs()));
        //     array_push($datasets[0]['data'], $logTime[$i][1] / 3600);
        //     $datasets[0]['total'] += $logTime[$i][1] / 3600;
        // }
        // $info['logtime'] = array(
        //     "labels" => $labels,
        //     "datasets" => $datasets
        // );
        // $info['picture'] = "https://intra.epitech.eu/".$user->autologin.$info['picture'];
        
        // $flagsRequest = EpitechApi::get('/user/'.$info['login']."/flags", $user->autologin);
        // $flags = (array) $flagsRequest;
        
        // $info["flags"] = array(
        //     "ghost" => count($flags["flags"]["ghost"]["modules"]),
        //     "difficulty" =>  count($flags["flags"]["difficulty"]["modules"]),
        //     "remarkable" => count($flags["flags"]["remarkable"]["modules"]),
        //     "medal" => count($flags["flags"]["medal"]["modules"])
        // );
        // return Message::createMessage(200, $info);
    }
}

<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\EpitechApi;
use Firebase\JWT\JWT;
use App\Utils\JWT as UtilsJWT;
use App\Utils\Message;

class ProfileController extends Controller {
    /**
     * Gets the logged user's profile from Epitech API
     *
     */
    public function getProfile(Request $request) {
        $path = "/user";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
        return Message::createMessage(403, "Pas autorisé");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $info = EpitechApi::get($path, $user->autologin);
        $info = (array) $info;
        $logTime = EpitechApi::get('/user/'.$info['login']."/netsoul", $user->autologin);
        $len = count($logTime);
        $info['logtime'] = [];
        $labels = [];
        $datasets = [
            array(
                "data" => [],
                "strokeWidth" => 2,
                "total" => 0
            )
            ];
        for ($i = $len - 7, $z = 0; $z < 7; $i += 1, $z += 1) {
            $time = new \Moment\Moment($logTime[$i][0]);
            array_push($labels, $time->format("DD/MM", new \Moment\CustomFormats\MomentJs()));
            array_push($datasets[0]['data'], $logTime[$i][1] / 3600);
            $datasets[0]['total'] += $logTime[$i][1] / 3600;
        }
        $info['logtime'] = array(
            "labels" => $labels,
            "datasets" => $datasets
        );
        $info['picture'] = "https://intra.epitech.eu/".$user->autologin.$info['picture'];
        $flagsRequest = EpitechApi::get('/user/'.$info['login']."/flags", $user->autologin);
        $flags = (array) $flagsRequest;
        $info["flags"] = array(
            "ghost" => $flags["flags"]["ghost"]["value"],
            "difficulty" =>  $flags["flags"]["difficulty"]["value"],
            "remarkable" => $flags["flags"]["remarkable"]["value"],
            "medal" => $flags["flags"]["medal"]["value"]
        );
        return Message::createMessage(200, $info);
    }
}

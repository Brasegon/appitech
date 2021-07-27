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

    public function getNotes($info, $user) {
        $notes = (array) EpitechApi::get('/user/'.$info['login']."/notes", EpitechApi::decrypt($user->autologin));
        $modules = $notes['modules'];
        $modules1 = [];
        foreach(array_reverse($modules) as $module) {
            array_push($modules1, array(
                "name" => $module['title'],
                "grade" => $module['grade'],
                "credit" => $module['credits']
            ));
        }
        return $modules1;
    }

    public function getProfile(Request $request) {
        $path = "/user";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);
        $info = EpitechApi::get($path, $autologin);
        if (is_null($info)) {
            return Message::createMessage(5000, "Intra is down");
        }
        $info = (array) $info;
        $logTime = EpitechApi::get('/user/'.$info['login']."/netsoul", $autologin);
        $len = count($logTime);
        $info['logtime'] = [];
        $info['notes'] = $this->getNotes($info, $user);
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
        $info['picture'] = "https://intra.epitech.eu/".$autologin.$info['picture'];
        
        $flagsRequest = EpitechApi::get('/user/'.$info['login']."/flags", $autologin);
        $flags = (array) $flagsRequest;
        
        $info["flags"] = array(
            "ghost" => count($flags["flags"]["ghost"]["modules"]),
            "difficulty" =>  count($flags["flags"]["difficulty"]["modules"]),
            "remarkable" => count($flags["flags"]["remarkable"]["modules"]),
            "medal" => count($flags["flags"]["medal"]["modules"])
        );
        return Message::createMessage(200, $info);
    }
}

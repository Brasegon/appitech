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

class CalendarController extends Controller
{
    public function getCalendar (Request $request) {
         $path = "/planning/load";
         $jwtData = UtilsJWT::authorize($request);
         if (is_null($jwtData)) {
             return Message::createMessage(403, "Unauthorized");
         }
         $jwtData = (array) $jwtData;
         $user = User::firstWhere('login', $jwtData['login']);
         $autologin = EpitechApi::decrypt($user->autologin);
         $calendar = EpitechApi::get($path, $autologin);
         if (is_null($calendar)) {
            return Message::createMessage(5000, "Intra is down");
        }
         $calendar = (array) $calendar;
        $modules = [];
        foreach ($calendar as $module) {
            if (is_null($module["room"])) {
                $module["room"] = array(
                    "type" => "Undefined room",
                    "code" => "Undefined room",
                    "seats" => 0
                );
            } else if (!isset($module["room"]["code"])) {
                $module["room"]["code"] = "Undefined room";
                $module["room"]["type"] = "Undefined room";
            }
            array_push($modules, array(
                "start" => $module["start"],
                "end" => $module["end"],
                "title" => $module["acti_title"],
                "summary" => $module["room"]["code"],
                "register" => $module["event_registered"],
                "codeacti" => $module["codeacti"],
                "codeevent" => $module["codeevent"],
                "codeinstance" => $module["codeinstance"],
                "codemodule" => $module["codeinstance"],
                "scolaryear" => $module["scolaryear"],
            ));
        }
         return Message::createMessage(200, $modules);
    }

    public function registerToModule (Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);

        $codeacti = $request->input("codeacti");
        $codeevent = $request->input("codeevent");
        $codeinstance = $request->input("codeinstance");
        $scholaryear = $request->input("scholaryear");
        $codemodule = $request->input("codemodule");

        $path = "module/".$scholaryear."/".$codemodule."/".$codeinstance."/".$codeacti."/".$codeevent."/register";
        return Message::createMessage(200, EpitechApi::post($path, $autologin));
    }

    public function unregisterToModule (Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);

        $codeacti = $request->input("codeacti");
        $codeevent = $request->input("codeevent");
        $codeinstance = $request->input("codeinstance");
        $scholaryear = $request->input("scholaryear");
        $codemodule = $request->input("codemodule");

        $path = "module/".$scholaryear."/".$codemodule."/".$codeinstance."/".$codeacti."/".$codeevent."/unregister";
        return Message::createMessage(200, EpitechApi::post($path, $autologin));
    }
}

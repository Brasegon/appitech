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
            array_push($modules, array(
                "start" => $module["start"],
                "end" => $module["end"],
                "title" => $module["acti_title"],
                "room" => $module["room"],
                "register" => $module["event_registered"]
            ));
        }
         return Message::createMessage(200, $modules);
    }
}

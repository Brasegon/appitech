<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\EpitechApi;
use Firebase\JWT\JWT;
use App\Utils\JWT as UtilsJWT;
use App\Utils\Message;

class DashboardController extends Controller {
    /**
     * Gets the logged user's profile from Epitech API
     *
     */
    public function getDashboard(Request $request) {
        $path = "";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $request1 = (array) EpitechApi::get($path, EpitechApi::decrypt($user->autologin));
        if (is_null($request1)) {
            return Message::createMessage(5000, "Intra is down");
        }
        
        return Message::createMessage(200, $request1);
    }

    public function getModules(Request $request) {
        $path = "/user";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);
        $request1 = (array) EpitechApi::get($path, $autologin);
        
        if (is_null($request1)) {
            return Message::createMessage(5000, "Intra is down");
        }
        
        return Message::createMessage(200, $request1);
    }
}

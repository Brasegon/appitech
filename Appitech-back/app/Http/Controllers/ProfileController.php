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
        return Message::createMessage(200, EpitechApi::get($path, $user->autologin));
    }
}

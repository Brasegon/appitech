<?php
namespace App\Http\Controllers;

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
        $path = "/user/?format=json";
        $jwtData = UtilsJWT::authorize($request);
         if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
         }
        $data = get_object_vars($jwtData);
        return Message::createMessage(500, EpitechApi::get($path, $data));
    }
}

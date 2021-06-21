<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Utils\EpitechApi;


class ProfileController extends Controller {
    /**
     * Gets the logged user's profile from Epitech API
     *
     */
    public function getProfile() {
        $path = "/user/?format=json";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
        }
        $data = get_object_vars($jwtData);
        return Message::createMessage(500, EpitechApi::get($path, $data));
    }
}

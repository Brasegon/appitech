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

class ConnectionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $login = $request->input("login");
        $password = $request->input("password");
        $autologin = $request->input("autologin");


        if ($login && $password && $autologin) {

           $user = User::firstWhere('login', $login);
           $ulength = strlen($login);
           $plength = strlen($password);
           $chars = "#$%^&*()+=-[]';,./{}|:<>?~!";

            switch ($ulength) {
                case ($ulength < 5):
                    return Message::createMessage(500, "Login too court (min 5)!");
                case ($ulength > 40):
                    return Message::createMessage(500, "Login too long (max 40)!");
            }
            switch ($password) {
                case ($plength < 8):
                    return Message::createMessage(500, "Password too short (min 8)!");
            }
            if ($user) {
                    return Message::createMessage(500, "User already exists");
            }
            $userExist = EpitechApi::get("user", $autologin);
            if (is_null($userExist)) {
                return Message::createMessage(5000, "Intra is down");
            }
            $userExist = (array) $userExist;
            if ($userExist && !isset($userExist['login'])) {
                return Message::createMessage(400, "Wrong Autologin");
            }
            User::create([
                "login" => $login,
                "password" => Hash::make($password, [
                    'rounds' => 10,
                ]),
                "autologin" => EpitechApi::encrypt($autologin),
                "epitech_mail" => $userExist['login']
            ]);
            return Message::createMessage(200, "Successuflly registered!");
        }

        return Message::createMessage(500, "Missing informations to register");
    }

     /**
     * Login a an existing user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login (Request $request) {
        $login = $request->input("login");
        $password = $request->input("password");

        if ($login && $password) {
            $user = User::firstWhere('login', $login);
            if (!$user) {
                return Message::createMessage(500, "Identifiants incorrects, veuillez rééssayer.");
            }
            if (Hash::check($password, $user['password'])) {
                $key = env('JWT_SECRET');
                $jwt = JWT::encode(array("login" => $user['login'], "autologin" => $user['autologin']), $key);
                return Message::createMessage(200, array("token" => $jwt));
            }
        }
        return Message::createMessage(500, "Invalid credentials, please try again.");
    }
}

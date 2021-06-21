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
                    return Message::createMessage(500, "Login trop court (min 5)!");
                case ($ulength > 20):
                    return Message::createMessage(500, "Login trop long (max 20)!");
            }
            switch ($password) {
                case ($plength < 8):
                    return Message::createMessage(500, "Mot de passe trop court (min 8)!");
            }
            if ($user) {
                    return Message::createMessage(500, "User exist !");
            }

            User::create([
                "login" => $login,
                "password" => Hash::make($password, [
                    'rounds' => 10,
                ]),
                "autologin" => $autologin
            ]);
            return Message::createMessage(200, "User created !");
        }

        return Message::createMessage(500, "Il manque des informations pour s'inscrire");
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
                return Message::createMessage(500, "Invalid Credentials, please try again"); 
            }
            if (Hash::check($password, $user['password'])) {
                $key = env('JWT_SECRET');
                $jwt = JWT::encode(array("login" => $user['login'], "autologin" => $user['autologin']), $key);
                return Message::createMessage(200, array("token" => $jwt));
            }
        }
        return Message::createMessage(500, "Invalid Credentials, please try again"); 
    }
}

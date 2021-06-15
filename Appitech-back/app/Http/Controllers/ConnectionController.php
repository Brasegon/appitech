<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Utils\Message;
use Exception;
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
        $key = "example_key";
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
}

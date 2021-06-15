<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

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

           if ($user) {
               
           }

            User::create([
                "login" => $login,
                "password" => $password,
                "autologin" => $autologin
            ]);
            return response(array(
                "code" => 200,
                "message" => "User created !"
            ));
        }

        return response(array(
            "code" => 500,
            "message" => "Erreur !"
        ));
    }
}

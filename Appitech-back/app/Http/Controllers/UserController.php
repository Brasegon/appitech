<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\Message;
use App\Utils\JWT as UtilsJWT;
use Illuminate\Support\Facades\Hash;
use App\Utils\EpitechApi;
use App\Utils\Version;
use Firebase\JWT\JWT;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);

        if ($request->login) {
            $expectedUser = User::firstWhere('login', $request->login);
            $ulength = strlen($request->login);

            switch ($ulength) {
                case ($ulength < 5):
                    return Message::createMessage(500, "Login too short (min 5)!");
                case ($ulength > 40):
                    return Message::createMessage(500, "Login too long (max 40)!");
            }
            if ($expectedUser)
                return Message::createMessage(500, "User already exists");

            USER::whereId($user['id'])->update(array('login' => $request->login));
        }

        if ($request->password) {
            $plength = strlen($request->password);

            switch ($request->password) {
                case ($plength < 8):
                    return Message::createMessage(500, "Password too short (min 8)!");
            }
            USER::whereId($user['id'])->update(array('password' => Hash::make($request->password, ['rounds' => 10])));
        }

        if ($request->autologin) {
        $userExist = EpitechApi::get("user", $request->autologin);
            if (is_null($userExist)) {
                return Message::createMessage(5000, "Intra is down");
            }
            $userExist = (array) $userExist;
            if ($userExist && !isset($userExist['login'])) {
                return Message::createMessage(400, "Wrong Autologin");
            }
            USER::whereId($user['id'])->update(array('autologin' => EpitechApi::encrypt($request->autologin)));
        }
        $user1 = User::firstWhere('id', $user['id']);
        $jwt = JWT::encode(array("login" => $user1['login'], "autologin" => $user1['autologin']), env('JWT_SECRET'));
        return Message::createMessage(200, array("token" => $jwt));
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updateUserInfo(Request $request)
    {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);
        $request1 = (array) EpitechApi::get("user", $autologin);
        if ($user['version'] != Version::$version) {
            USER::whereId($user['id'])->update(array(
                "scolaryear" => $request1['scolaryear'],
                "course_code" => $request1['course_code'],
                "version" => Version::$version,
                "location" => $request1['location'],
            ));
        }

        return Message::createMessage(200, "good");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}

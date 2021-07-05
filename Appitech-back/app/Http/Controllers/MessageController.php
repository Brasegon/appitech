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

class MessageController extends Controller
{
    public function getMessages (Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unautorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        if (!$user) {
            return Message::createMessage(403, "Unautorized");
        }
        $autologin = EpitechApi::decrypt($user->autologin);
        $path = "user/".$user->login."/notification/message";
        $info = EpitechApi::get($path, $autologin);
        $info = (array) $info;
        $messages = [];
        foreach ($info as $message) {
            array_push($messages, array(
                "message" => htmlspecialchars(trim(strip_tags(($message['title'])))),
                "user" => $message['user']['title'],
                "date" => $message['date'],
                "img" => "https://intra.epitech.eu/".$autologin.$message['user']['picture']
            ));
        }
        return Message::createMessage(200, $messages);
    }
}

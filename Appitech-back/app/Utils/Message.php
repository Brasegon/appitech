<?php

namespace App\Utils;


class Message
{
    public static function createMessage($code, $message)
    {
        return response(array(
            "code" => $code,
            "message" => $message
        ), $code);
    }
}

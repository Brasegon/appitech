<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\EpitechApi;
use Firebase\JWT\JWT;
use App\Utils\JWT as UtilsJWT;
use App\Utils\Message;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller {
    /**
     * Gets the logged user's profile from Epitech API
     *
     */
    public function getDashboard(Request $request) {
        $path = "";
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $request1 = (array) EpitechApi::get($path, EpitechApi::decrypt($user->autologin));
        if (is_null($request1)) {
            return Message::createMessage(5000, "Intra is down");
        }

        return Message::createMessage(200, $request1);
    }

    public function getModules(Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Pas autorisé");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $path = "course/filter";
        $autologin = EpitechApi::decrypt($user->autologin);
        $request1 = (array) EpitechApi::get("/ping", $autologin);
        $modules = (array) EpitechApi::get($path, $autologin, "&course=".$user['course_code']."&scolaryear=".$user['scolaryear']);
        $listModules = [];
        $i = 0;

        foreach($modules as $module) {
            $advance = $this->getAdvance($module['begin'], $module['end']);
            array_push($listModules, array(
                "id" => $i,
                "name" => $module['title'],
                "start" => $module['begin'],
                "end" => $module['end'],
                "count" => $module['credits'],
                "register" => ($module['status'] == "notregistered" ? false : true),
                "scolaryear" => $module['scolaryear'],
                "code" => $module['code'],
                "codeinstance" => $module['codeinstance'],
                "advance" => $advance
            ));
            $i += 1;
        }
        Log::info($modules);
        if (is_null($request1)) {
            return Message::createMessage(5000, "Intra is down");
        }

        return Message::createMessage(200, $listModules);
    }

    public function getAdvance($start, $end)
    {
        $now1 = strtotime($start);
        $your_date1 = strtotime($end);
        $datediff1 = $now1 - $your_date1;
        $day1 = round($datediff1 / (60 * 60 * 24));

        $now2 = strtotime($start);
        $your_date2 = time();
        $datediff2 = $now2 - $your_date2;
        $day2 = round($datediff2 / (60 * 60 * 24));

        return $day2 / $day1;
    }
}

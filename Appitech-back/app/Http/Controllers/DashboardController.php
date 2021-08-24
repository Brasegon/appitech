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
        $reg = explode('@', $user['epitech_mail']);
        $reg2 = explode('.', $reg[0]);
        foreach($request1['board']['projets'] as $key => $projet) {
            $request1['board']['projets'][$key]['timeline_start'] = explode(",", $projet['timeline_start'])[0];
            $request1['board']['projets'][$key]['timeline_end'] = explode(",", $projet['timeline_end'])[0];
        }
        foreach($request1['board']['activites'] as $key => $projet) {
            $request1['board']['activites'][$key]['timeline_start'] = explode(",", $projet['timeline_start'])[0];
            $request1['board']['activites'][$key]['timeline_end'] = explode(",", $projet['timeline_end'])[0];
            $request1['board']['activites'][$key]['timeline_hour_start'] = ltrim(explode(",", $projet['timeline_start'])[1]);
            $request1['board']['activites'][$key]['timeline_hour_end'] = ltrim(explode(",", $projet['timeline_end'])[1]);
        }
        if (is_null($request1)) {
            return Message::createMessage(5000, "Intra is down");
        }
        $dashboard = array(
            "projects" => $request1['board']['projets'],
            "activities" => $request1['board']['activites'],
            "userName" => $reg2[0]." ".$reg2[1]
        );

        return Message::createMessage(200, $dashboard);
    }
    private static function orderByDate($a, $b) {
        //retourner 0 en cas d'égalité
        if ($a['end'] == $b['end']) {
            return 0;
        } else if ($a['end'] > $b['end']) {//retourner -1 en cas d’infériorité
            return -1;
        } else {//retourner 1 en cas de supériorité
            return 1;
        }
    }
    public function getModules(Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $path = "course/filter";
        $autologin = EpitechApi::decrypt($user->autologin);
        $request1 = (array) EpitechApi::get("/ping", $autologin);
        $modules = (array) EpitechApi::get($path, $autologin, "&location=".$user['location']."&course=".$user['course_code']."&scolaryear=".$user['scolaryear']);
        $listModules = [];
        $i = 1;
        array_push($listModules, array(
            "id" => 0,
            "name" => "Module Demo",
            "start" => "2020-12-07",
            "end" => "2022-09-05",
            "count" => 60,
            "register" => true,
            "scolaryear" => 2020,
            "code" => "TEST",
            "codeinstance" => "TEST",
            "register_link" => "test/register",
            "unregister_link" => "test/unregister",
            "advance" => 0.5
        ));
        foreach($modules as $module) {
            $advance = $this->getAdvance($module['begin'], $module['end']);
            $link_path = "module/".$module['scolaryear']."/".$module['code']."/".$module['codeinstance']."/";
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
                "register_link" => $link_path."register",
                "unregister_link" => $link_path."unregister",
                "advance" => $advance
            ));
            $i += 1;
        }
        usort($listModules, array($this, 'orderByDate'));
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

    public function postLink(Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);
        $link = $request->input("link");
        return Message::createMessage(200, EpitechApi::post($link, $autologin));
    }

    public function getProjectModules(Request $request) {
        $jwtData = UtilsJWT::authorize($request);
        if (is_null($jwtData)) {
            return Message::createMessage(403, "Unauthorized");
        }
        $jwtData = (array) $jwtData;
        $user = User::firstWhere('login', $jwtData['login']);
        $autologin = EpitechApi::decrypt($user->autologin);

        $codeinstance = $request->query("codeinstance");
        $scholaryear = $request->query("scholaryear");
        $codemodule = $request->query("codemodule");
        if ($codemodule == "TEST") {
            array_push($array, array(
                "title" => "Projet Register",
                "start" => "2020-12-07",
                "end" => "2022-09-05",
                "registered" => true,
                "register_link" => "test/project/register",
                "unregister_link" => "test/project/unregister",
                "advance" => 0.5
            ));
            array_push($array, array(
                "title" => "Projet Unregister",
                "start" => "2020-12-07",
                "end" => "2022-09-05",
                "registered" => false,
                "register_link" => "test/project/register",
                "unregister_link" => "test/project/unregister",
                "advance" => 0.5
            )); 
        }
        $path = "module/".$scholaryear."/".$codemodule."/".$codeinstance."/";
        $projects = (array) EpitechApi::get($path, $autologin);
        $array = [];
        
        foreach($projects['activites'] as $project) {
            $advance = $this->getAdvance($project['begin'], $project['end']);
            $paths = $path.$project['codeacti']."/";
            $isRegistered = (array) EpitechApi::get($paths, $autologin);
            if (isset($isRegistered['student_registered'])) {
                $isRegistered = ($isRegistered['student_registered']['registered'] == '1') ? true : false;
            } else {
                $isRegistered = ($project['register'] == 1) ? true : false;
            }
            array_push($array, array(
                "title" => $project['title'],
                "start" => explode(" ", $project['start'])[0],
                "end" => explode(" ", $project['end'])[0],
                "registered" => $isRegistered,
                "register_link" => $path.$project['codeacti']."/project/register",
                "unregister_link" => $path.$project['codeacti']."/project/unregister",
                "advance" => $advance
            ));
        }
        return Message::createMessage(200, $array);
    }
}

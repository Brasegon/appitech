<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/register", [ConnectionController::class, "register"]);

Route::post("/login", [ConnectionController::class, "login"]);

Route::get("/dashboard", [DashboardController::class, "getDashboard"]);

Route::get("/calendar", [CalendarController::class, "getCalendar"]); 

Route::get("/messages", [MessageController::class, "getMessages"]);

Route::get("/profile", [ProfileController::class, "getProfile"]);

Route::put("/editProfile", [UserController::class, "edit"]);
Route::get("/modules", [DashboardController::class, "getModules"]);
Route::post("/update", [UserController::class, "updateUserInfo"]);


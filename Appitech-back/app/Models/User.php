<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $attributes = [
        'login' => "Salut",
    ];
    public $fillable = [
        'login',
        'password',
        'autologin',
        'scolaryear',
        'version',
        'course_code',
        'epitech_mail',
        'reset_token'
    ];
}

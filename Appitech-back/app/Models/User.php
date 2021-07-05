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
        'epitech_mail',
        'reset_token'
    ];
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post = User::create(['login' => "brandon", 'password' => "dsqfdsf", 'autologin' => "blbllblbl"]);

        $user = User::firstWhere('login', "brandon");
        $user['reset_token'] = "jdqsjfdjsdjfjdjsgjdhqydauzizoeozarifiisfisqfhdsjgpsdlgldmkqjdjfsfksqjhzaaldd,fvnnf===";
        $user->save();
    }
}

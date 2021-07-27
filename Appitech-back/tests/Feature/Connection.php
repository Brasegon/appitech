<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class Connection extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_registration_bad_entry()
    {
        $response = $this->call('POST', '/api/register');
        $response->assertStatus(500);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_registration_good_entry()
    {
        $tab = ['login' => "val", 'password' => "toto", 'autologin' => "yrgfygfrgyry"];

        $response = $this->call('POST', '/api/register', $tab);
        var_dump($response);
        $response->assertStatus(500);
    }
}

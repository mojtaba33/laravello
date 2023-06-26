<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use GraphQL\Error\Error;
use Illuminate\Support\Facades\Hash;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = User::where('email',$args['email'])->first();
        if($user && Hash::check($args['password'], $user->password))
        {
            return auth()->user();
        }

        return throw new Error('Invalid credentials.');
    }
}

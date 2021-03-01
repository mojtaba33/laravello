<?php

namespace App\GraphQL\Mutations;

use GraphQL\Error\Error;
use Illuminate\Support\Facades\Auth;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        if(!Auth::guard(config('sanctum.guard', 'web'))->attempt($args))
        {
            return throw new Error('Invalid credentials.');
        }

        return auth()->user();
    }
}

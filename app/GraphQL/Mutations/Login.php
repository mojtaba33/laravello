<?php

namespace App\GraphQL\Mutations;

use GraphQL\Error\Error;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class Login
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if (!$guard->attempt($args)) {
            throw new Error('Invalid credentials.');
        }

        return $guard->user();
    }
}

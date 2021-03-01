<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = auth()->user();
        Auth::guard(config('sanctum.guard', 'web'))->logout();
        return $user;
    }
}

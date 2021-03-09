<?php

namespace App\GraphQL\Mutations;

class CreateBoard
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return auth()->user()->boards()->create([
            'title' => $args['title'],
            'color' => $args['color']
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\CardList;
use App\Models\User;
use Illuminate\Database\Seeder;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->random(5)->map(function ($user){
            $board = Board::factory()->for($user,'owner')->create();

            $lists = CardList::factory()->has(Card::factory()->count(random_int(2,7))->for($user,'owner'))->count(random_int(1,5))->make();

            $board->lists()->saveMany($lists);
        });

    }
}

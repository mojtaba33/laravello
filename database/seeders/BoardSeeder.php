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
        for( $i = 0 ; $i < 50 ; $i++ )
        {
            $user = User::all()->random();
            CardList::factory()
                ->has(Card::factory()->count(random_int(2,7))->for($user,'owner'),'cards')
                ->count(random_int(1,5))
                ->for(Board::factory()->for($user,'owner'))
                ->create();
        }
    }
}

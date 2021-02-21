<?php

namespace Database\Factories;

use App\Models\Board;
use App\Models\CardList;
use Illuminate\Database\Eloquent\Factories\Factory;

class CardListFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CardList::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
        ];
    }
}

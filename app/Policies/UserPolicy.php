<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewBoards(User $user,User $viwer)
    {
        return $user->id === $viwer->id;
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Skill;

class Project extends Model
{
    protected $table = 'projects';
    protected $guarded = [];

    public function skills ()
    {
        return $this->belongsToMany(Skill::class);
    }

    public function user ()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

}

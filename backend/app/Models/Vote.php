<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'petition_id', 'vote_type'];

    public function petition()
    {
        return $this->belongsTo(Petition::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

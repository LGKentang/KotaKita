<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Petition extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'description', 'submissionDate', 'status', 'upvotes', 'downvotes', 'thumbnail_url'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    protected function petitions(){
        return $this->belongsTo(User::class);
    }
}

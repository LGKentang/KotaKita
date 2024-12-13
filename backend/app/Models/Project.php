<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'budget',
        'status',
        'institute_id',
        'thumbnail_url',
    ];

    public function institute()
    {
        return $this->belongsTo(Institute::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

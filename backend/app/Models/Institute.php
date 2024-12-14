<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_number',
        'slogan',
        'founded_on',
        'impact_description',
        'logo_url',
        'thumbnail_url',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}

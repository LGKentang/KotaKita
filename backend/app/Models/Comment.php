<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'project_id', 
        'petition_id', 
        'message', 
        'comment_date', 
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function petition()
    {
        return $this->belongsTo(Petition::class);
    }

    public function user()
{
    return $this->belongsTo(User::class);
}
}

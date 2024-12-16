<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetitionInstitute extends Model
{
    protected $table = 'petition_institute';

    protected $fillable = ['petition_id', 'institute_id', 'status'];

    public $timestamps = true; 
}

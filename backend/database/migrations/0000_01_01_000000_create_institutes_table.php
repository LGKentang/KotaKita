<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstitutesTable extends Migration
{
    public function up()
    {
        Schema::create('institutes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact_number');
            $table->string('slogan')->default('Your Slogan'); 
            $table->string('impact_description')->default('Your Impact Description'); 
            $table->date('founded_on')->nullable(); 
            $table->string('logo_url')->nullable();  
            $table->string('thumbnail_url')->nullable();  
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('institutes');
    }
}

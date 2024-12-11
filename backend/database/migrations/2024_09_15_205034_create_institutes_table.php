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
            $table->string('slogan');
            $table->date('founded_on');
            $table->string('impact_description');
            $table->string('logo_url');
            $table->string('thumbnail_url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('institutes');
    }
}

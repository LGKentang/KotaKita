<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetitionsTable extends Migration
{
    public function up()
    {
        Schema::create('petitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->date('submissionDate');
            $table->string('status');
            $table->integer('upvotes')->default(0);
            $table->integer('downvotes')->default(0);
            $table->string('thumbnail_url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('petitions');
    }
}

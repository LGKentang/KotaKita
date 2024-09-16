<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBudgetAllocationsTable extends Migration
{
    public function up()
    {
        Schema::create('budget_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->string('phase');
            $table->decimal('amount', 15, 2);
            $table->date('date_allocated');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('budget_allocations');
    }
}

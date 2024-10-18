<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('projects')->insert([
            ['name' => 'Project A', 'description' => 'Description for project A', 'institute_id' => 1, 'start_date' => now(), 'end_date' => null, 'budget' => 10000.00, 'current_progress' => 0.00, 'status' => 'ongoing'],
            ['name' => 'Project B', 'description' => 'Description for project B', 'institute_id' => 2, 'start_date' => now(), 'end_date' => null, 'budget' => 20000.00, 'current_progress' => 0.00, 'status' => 'planned'],
            // Add more projects as needed
        ]);
    }
}

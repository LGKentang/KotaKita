<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdatesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('updates')->insert([
            ['project_id' => 1, 'description' => 'Update for project A', 'update_date' => now(), 'progress' => 25.00],
            // Add more updates as needed
        ]);
    }
}

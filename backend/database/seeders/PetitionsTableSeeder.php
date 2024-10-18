<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PetitionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('petitions')->insert([
            ['user_id' => 1, 'title' => 'Petition A', 'description' => 'Description for petition A', 'submissionDate' => now(), 'status' => 'active'],
            ['user_id' => 1, 'title' => 'Petition B', 'description' => 'Description for petition B', 'submissionDate' => now(), 'status' => 'inactive'],
            // Add more petitions as needed
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InstitutesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('institutes')->insert([
            ['name' => 'Institute A', 'contact_number' => '123456789'],
            ['name' => 'Institute B', 'contact_number' => '987654321'],
            // Add more institutes as needed
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            InstitutesTableSeeder::class,
        ]);

        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => "0000000000",
            'role' => 'user'
        ]);

        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'phone_number' => "0000000000",
            'role' => 'user'
        ]);

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'phone_number' => "0000000000",
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'ycab',
            'email' => 'ycab@gmail.com',
            'phone_number' => "0000000000",
            'institute_id' => 1,
            'role' => 'institute'
        ]);

        $this->call([
            PetitionsTableSeeder::class,
            ProjectsTableSeeder::class,
            CommentsTableSeeder::class,
            UpdatesTableSeeder::class,
            VotesTableSeeder::class,
            BudgetAllocationsTableSeeder::class,
        ]);

    }
}

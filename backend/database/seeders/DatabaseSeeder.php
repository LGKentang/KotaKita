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
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
        ]);
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
        ]);

        $this->call([
            InstitutesTableSeeder::class,
            PetitionsTableSeeder::class,
            ProjectsTableSeeder::class,
            CommentsTableSeeder::class,
            UpdatesTableSeeder::class,
            VotesTableSeeder::class,
            BudgetAllocationsTableSeeder::class,
        ]);

    }
}

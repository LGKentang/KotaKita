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
            'role' => 'user',
            'profile_picture_url' => "https://banner2.cleanpng.com/20180425/euw/kisspng-magna-carta-holy-grail-libra-love-student-scorpio-5ae1327bf138f2.8866027715247079639881.jpg"
        ]);

        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'phone_number' => "0000000000",
            'role' => 'user',
            'profile_picture_url' => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmEalYEgZpkDNhLZKB0jlj6UpIuow7_849g&s"
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

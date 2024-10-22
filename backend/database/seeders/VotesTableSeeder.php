<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VotesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('votes')->insert([
            ['user_id' => 1, 'vote_type' => 'upvote', 'petition_id' => 1],
            ['user_id' => 2, 'vote_type' => 'downvote', 'petition_id' => 2],
            // Add more votes as needed
        ]);
    }
    
}

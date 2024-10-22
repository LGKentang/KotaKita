<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('comments')->insert([
            ['user_id' => 1, 'project_id' => 1, 'petition_id' => null, 'message' => 'This is a comment on project A.', 'comment_date' => now()],
            ['user_id' => 2, 'project_id' => null, 'petition_id' => 1, 'message' => 'This is a comment on petition A.', 'comment_date' => now()],
            // Add more comments as needed
        ]);
    }
}

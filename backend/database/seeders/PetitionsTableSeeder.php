<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PetitionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('petitions')->insert([
            [
                'user_id' => 1, 
                'title' => 'Petition for Climate Change Action', 
                'description' => 'Support the movement to fight climate change.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 350,
                'downvotes' => 50,
                'thumbnail_url' => 'https://picsum.photos/200/300?random=1'
            ],
            [
                'user_id' => 1, 
                'title' => 'Petition for Affordable Healthcare', 
                'description' => 'Make healthcare affordable for everyone.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 500,
                'downvotes' => 30,
                'thumbnail_url' => 'https://picsum.photos/200/300?random=2'
            ],
            [
                'user_id' => 1, 
                'title' => 'Petition for Free Education', 
                'description' => 'Support free education for all students.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 1200,
                'downvotes' => 200,
                'thumbnail_url' => 'https://picsum.photos/200/300?random=3'
            ],
            [
                'user_id' => 1, 
                'title' => 'Petition for Animal Rights', 
                'description' => 'Fight for the rights of animals around the world.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 900,
                'downvotes' => 60,
                'thumbnail_url' => 'https://picsum.photos/200/300?random=4'
            ],
            [
                'user_id' => 1, 
                'title' => 'Petition for Mental Health Awareness', 
                'description' => 'Help raise awareness for mental health issues.', 
                'submissionDate' => Carbon::now(), 
                'status' => 'Open',
                'upvotes' => 450,
                'downvotes' => 50,
                'thumbnail_url' => 'https://picsum.photos/200/300?random=5'
            ],
        ]);
    }
}

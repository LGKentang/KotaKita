<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InstitutesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('institutes')->insert([
            [
                'name' => 'YCAB Foundation',
                'contact_number' => '123456789',
                'slogan' => 'Empowering youth with education, economic support, and welfare programs.',
                'founded_on' =>  Carbon::parse('1999-01-01'), // Use an actual date
                'impact_description' => 'Impact: 50,000+ youth reached',
                'logo_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjN8Fi61Qh17zv_PQWNfxnK7YAVCHAu-Vgvw&s',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjN8Fi61Qh17zv_PQWNfxnK7YAVCHAu-Vgvw&s', // Same as logo URL, you can adjust later
            ],
            [
                'name' => 'Wahana Visi Indonesia',
                'contact_number' => '987654321',
                'slogan' => 'Supporting underserved communities with essentials for a healthy life.',
                'founded_on' => Carbon::parse('2002-01-01'),
                'impact_description' => 'Impact: 100,000+ families supported',
                'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/LOGO_WVI_FY_22-global.png/1200px-LOGO_WVI_FY_22-global.png',
                'thumbnail_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/LOGO_WVI_FY_22-global.png/1200px-LOGO_WVI_FY_22-global.png',
            ],
            [
                'name' => 'Green Earth Foundation',
                'contact_number' => '1122334455',
                'slogan' => 'Promotes environmental awareness and conservation initiatives.',
                'founded_on' => Carbon::parse('2010-01-01'),
                'impact_description' => 'Impact: 20,000 trees planted',
                'logo_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHg8FVlt_mvGfLwHxk4cXMtKmUSA7wO0d0A&s',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHg8FVlt_mvGfLwHxk4cXMtKmUSA7wO0d0A&s', // Same as logo URL, you can adjust later
            ],
            [
                'name' => 'Global Health Initiative',
                'contact_number' => '9988776655',
                'slogan' => 'Focusing on improving health outcomes in underserved regions.',
                'founded_on' => Carbon::parse('2005-01-01'),
                'impact_description' => 'Impact: 5,000+ patients treated',
                'logo_url' => 'https://yt3.googleusercontent.com/ytc/AIdro_nAgNsHMyXMD30UOrKR5lmRJtDZJfHStZg85-1Rn2S8sw=s900-c-k-c0x00ffffff-no-rj',
                'thumbnail_url' => 'https://yt3.googleusercontent.com/ytc/AIdro_nAgNsHMyXMD30UOrKR5lmRJtDZJfHStZg85-1Rn2S8sw=s900-c-k-c0x00ffffff-no-rj', // Same as logo URL, you can adjust later
            ],
        ]);
    }
}

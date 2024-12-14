<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProjectsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('projects')->insert([
            [
                'name' => 'Rumah Belajar',
                'description' => 'Pusat-pusat yang menyediakan pendidikan alternatif dan pelatihan keterampilan vokasi untuk kaum muda kurang mampu.',
                'institute_id' => 1, // Assuming 'Yayasan Cinta Anak Bangsa (YCAB Foundation)' has an id of 1
                'start_date' => Carbon::parse('2024-01-01'),
                'end_date' => null,
                'budget' => 5000000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Progress',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm6aRWTCS4iKzmvwqDkNW0s2UXEqc3kVougw&s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bantuan Pinjaman untuk UMKM',
                'description' => 'Pembiayaan mikro untuk keluarga dalam rangka meningkatkan kondisi ekonomi mereka.',
                'institute_id' => 2, // Assuming 'Bank Nasional Indonesia' has an id of 2
                'start_date' => Carbon::parse('2024-03-01'),
                'end_date' => null,
                'budget' => 4800000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Progress',
                'thumbnail_url' => 'https://propseva.com/wp-content/uploads/2023/02/Home-Loan.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pembangunan Puskesmas',
                'description' => 'Pengembangan pusat kesehatan untuk menyediakan layanan kesehatan yang terjangkau.',
                'institute_id' => 3, // Assuming 'Kementerian Kesehatan' has an id of 3
                'start_date' => Carbon::parse('2024-01-01'),
                'end_date' => null,
                'budget' => 5500000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Planning',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjqF9RVzZGyQoMDL9oeWuUMZpo8ts4RmigQ&s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rehabilitasi Sungai',
                'description' => 'Program untuk membersihkan dan merehabilitasi sungai yang tercemar.',
                'institute_id' => 4, // Assuming 'Kementerian Lingkungan Hidup' has an id of 4
                'start_date' => Carbon::parse('2024-02-01'),
                'end_date' => null,
                'budget' => 3600000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Progress',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDtG9AyzfzCtk4GrkDhs1oZn5SwwS2g8Yqg&s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pendidikan Digital untuk Desa',
                'description' => 'Pelatihan teknologi untuk anak muda di desa agar mereka dapat mengakses peluang digital.',
                'institute_id' => 2, // Assuming 'Komunitas Peduli Teknologi' has an id of 5
                'start_date' => Carbon::parse('2024-03-01'),
                'end_date' => null,
                'budget' => 4100000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Progress',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-mZDv6nKKkHgxo39niGTBwCV0nehtSOJdA&s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rehabilitasi Hutan',
                'description' => 'Rehabilitasi hutan tropis untuk memulihkan ekosistem dan keanekaragaman hayati.',
                'institute_id' => 3, // Assuming 'Badan Restorasi Ekosistem' has an id of 6
                'start_date' => Carbon::parse('2024-02-01'),
                'end_date' => null,
                'budget' => 6500000, // Sum of budgetAllocation: taxes + governmentGrant + privateFunding + donations
                'status' => 'In Progress',
                'thumbnail_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_2G6SLOuKp5D9qgVjID4P3LhRzgV49dMwXs&s',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

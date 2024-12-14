<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BudgetAllocationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('budget_allocations')->insert([
            ['project_id' => 1, 'allocation_type' => "governmentTax", 'amount' => 5000.00, 'date_allocated' => now()],
            // Add more budget allocations as needed
        ]);
    }
}

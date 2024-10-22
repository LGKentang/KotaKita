<?php

namespace App\Http\Controllers;

use App\Models\BudgetAllocation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BudgetAllocationController extends Controller
{
    // Display a listing of the budget allocations.
    public function index(): JsonResponse
    {
        $budgetAllocations = BudgetAllocation::all();
        return response()->json($budgetAllocations);
    }

    // Store a newly created budget allocation in storage.
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'phase' => 'required|string',
            'amount' => 'required|numeric',
            'date_allocated' => 'required|date',
        ]);

        $budgetAllocation = BudgetAllocation::create($request->all());
        return response()->json($budgetAllocation, 201); // 201 Created
    }

    // Display the specified budget allocation.
    public function show($id): JsonResponse
    {
        $budgetAllocation = BudgetAllocation::findOrFail($id);
        return response()->json($budgetAllocation);
    }

    // Update the specified budget allocation in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'project_id' => 'sometimes|required|exists:projects,id',
            'phase' => 'sometimes|required|string',
            'amount' => 'sometimes|required|numeric',
            'date_allocated' => 'sometimes|required|date',
        ]);

        $budgetAllocation = BudgetAllocation::findOrFail($id);
        $budgetAllocation->update($request->all());
        return response()->json($budgetAllocation);
    }

    // Remove the specified budget allocation from storage.
    public function destroy($id): JsonResponse
    {
        $budgetAllocation = BudgetAllocation::findOrFail($id);
        $budgetAllocation->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

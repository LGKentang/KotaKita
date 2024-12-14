<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UpdateController extends Controller
{
    public function index(): JsonResponse
    {
        $updates = Update::all();
        return response()->json($updates);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'description' => 'required|string',
            'update_date' => 'required|date',
            'progress' => 'required|numeric|min:0|max:100', // Assuming progress is a percentage
        ]);

        $update = Update::create($request->all());
        return response()->json($update, 201); // 201 Created
    }

    // Display the specified update.
    public function show($id): JsonResponse
    {
        $update = Update::findOrFail($id);
        return response()->json($update);
    }

    // Update the specified update in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'project_id' => 'sometimes|required|exists:projects,id',
            'description' => 'sometimes|required|string',
            'update_date' => 'sometimes|required|date',
            'progress' => 'sometimes|required|numeric|min:0|max:100',
        ]);

        $update = Update::findOrFail($id);
        $update->update($request->all());
        return response()->json($update);
    }

    // Remove the specified update from storage.
    public function destroy($id): JsonResponse
    {
        $update = Update::findOrFail($id);
        $update->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

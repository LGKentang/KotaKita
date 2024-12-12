<?php

namespace App\Http\Controllers;

use App\Models\Petition;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PetitionController extends Controller
{
    public function index(): JsonResponse
    {
        $petitions = Petition::all();
        return response()->json($petitions);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'submissionDate' => 'required|date',
            'status' => 'required|string|max:50',
            'user_id' => 'required|exists:users,id', 
        ]);

        $petition = Petition::create($request->all());
        return response()->json($petition, 201); // 201 Created
    }

    public function show($id): JsonResponse
    {
        $petition = Petition::findOrFail($id);
        return response()->json($petition);
    }

    // Update the specified petition in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'submissionDate' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|max:50',
            // Add other validation rules as needed
        ]);

        $petition = Petition::findOrFail($id);
        $petition->update($request->all());
        return response()->json($petition);
    }

    // Remove the specified petition from storage.
    public function destroy($id): JsonResponse
    {
        $petition = Petition::findOrFail($id);
        $petition->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

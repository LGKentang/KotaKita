<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    // Display a listing of the projects.
    public function index(): JsonResponse
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    // Store a newly created project in storage.
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'institute_id' => 'required|exists:institutes,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'required|numeric',
            'current_progress' => 'required|numeric|min:0|max:100',
            'status' => 'required|string|max:50',
        ]);

        $project = Project::create($request->all());
        return response()->json($project, 201); // 201 Created
    }

    // Display the specified project.
    public function show($id): JsonResponse
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    // Update the specified project in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'institute_id' => 'sometimes|required|exists:institutes,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|nullable|date|after_or_equal:start_date',
            'budget' => 'sometimes|required|numeric',
            'current_progress' => 'sometimes|required|numeric|min:0|max:100',
            'status' => 'sometimes|required|string|max:50',
        ]);

        $project = Project::findOrFail($id);
        $project->update($request->all());
        return response()->json($project);
    }

    // Remove the specified project from storage.
    public function destroy($id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

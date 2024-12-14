<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ProjectController extends Controller
{

    public function index(): JsonResponse
    {
        $projects = Project::all();
        return response()->json($projects);
    }


    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'required|numeric',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        $user = Auth::user();
        $institute_id = $user->institute_id;

        if ($institute_id == null) {
            return response()->json(['error' => 'Account is not associated with an institute'], 400);
        }

        $imagePath = null;
        if ($request->hasFile('thumbnail')) {
            $image = $request->file('thumbnail');
            $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('projects', $fileName, 'public');
        }

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'budget' => $request->budget,
            'status' => "Not Started",
            'institute_id' => $institute_id,  
            'thumbnail_url' => $imagePath,
        ]);

        return response()->json($project, 201);
    }
    
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

<?php

namespace App\Http\Controllers;

use App\Models\Petition;
use App\Services\FileService;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PetitionController extends Controller
{
    public function getUserPetitions(Request $request)
    {
        
        $user = Auth::user();
    
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized user.',
            ], 401);
        }
    
        $petitions = $user->petitions;

        return response()->json([
            'petitions' => $petitions,
        ]);
    }

    // public function setPetition
    

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
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]); 

        $user = Auth::user();

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $image = $request->file('thumbnail');
            $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $thumbnailPath = $image->storeAs("thumbnails", $fileName, 'public');
        }
        
        $petition = Petition::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'description' => $request->description,
            'submissionDate' => $request->submissionDate,
            'status' => $request->status,
            'thumbnail_url' => $thumbnailPath,
        ]);

        return response()->json($petition, 201);
    }

    public function show($id): JsonResponse
    {
        $petition = Petition::findOrFail($id);
        return response()->json($petition);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'submissionDate' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|max:50',
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

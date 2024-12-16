<?php

namespace App\Http\Controllers;

use App\Models\Institute;
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
    
        foreach ($petitions as $petition) {
            if ($petition->institute_id) {
                $petition->institute_name = Institute::find($petition->institute_id)->name ?? 'Institute not found';
            } else {
                $petition->institute_name = null;
            }
        }
    
        return response()->json([
            'petitions' => $petitions,
        ]);
    }
    

    public function setPetitionStatus(Request $request): JsonResponse
    {
        $request->validate([
            'petition_id' => 'required|integer|exists:petitions,id',
            'status' => 'required|string|in:open,closed,Open,Closed',
        ]);
    
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized user.',
            ], 401);
        }
    
        $petition = Petition::where('id', $request->petition_id)
                            ->where('user_id', $user->id)
                            ->first();
    
        if (!$petition) {
            return response()->json([
                'success' => false,
                'message' => 'Petition not found or does not belong to the user.',
            ], 404);
        }
    
        if ($petition->status === $request->status) {
            return response()->json([
                'success' => false,
                'message' => "The petition status is already '{$request->status}'.",
            ], 400); 
        }
    
        // Update the status
        $petition->status = $request->status;
        $petition->save();
    
        return response()->json([
            'success' => true,
            'message' => 'Petition status updated successfully.',
            'petition' => $petition,
        ]);
    }
    
    
    

    public function index(): JsonResponse
    {
        $petitions = Petition::all();
    
        foreach ($petitions as $petition) {
            if ($petition->institute_id) {
                $petition->institute_name = Institute::find($petition->institute_id)->name ?? 'Institute not found';
            } else {
                $petition->institute_name = null;
            }
        }
    
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

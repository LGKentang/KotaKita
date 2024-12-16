<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Petition;
use App\Models\Project;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function getComment(Request $request)
    {
        $projectId = $request->query('project_id');
        $petitionId = $request->query('petition_id');
        
        if ($projectId != "null") {
            $project = Project::find($projectId);
            if (!$project) {
                return response()->json(['error' => 'Project not found'], 404);
            }
            $comments = $project->comments;
        } elseif ($petitionId != "null") {
            $petition = Petition::find($petitionId);
            if (!$petition) {
                return response()->json(['error' => 'Petition not found'], 404);  // Corrected error message here
            }
            $comments = $petition->comments;
        } else {
            return response()->json(['error' => 'No project or petition ID provided'], 400);
        }
        
        // Format the comments to include username and profile picture URL
        $formattedComments = $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'message' => $comment->message,
                'created_at' => $comment->created_at,
                'name' => $comment->user->name, // Assuming 'name' is the column in 'users' table
                'profile_picture_url' => $comment->user->profile_picture_url // Assuming 'profile_picture_url' is the column in 'users' table
            ];
        });
        
        return response()->json($formattedComments);
    }
    
    
    
    
    

    public function comment(Request $request): JsonResponse
    {
        $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'petition_id' => 'nullable|exists:petitions,id', 
            'message' => 'required|string', 
        ]);
    
        $user = Auth::user();
    
        if (!$request->input('project_id') && !$request->input('petition_id')) {
            return response()->json(['message' => 'Either project_id or petition_id must be provided.'], 400);
        }

        if ($request->input('project_id') && $request->input('petition_id')) {
            return response()->json(['message' => 'Cannot comment on both at the same time'], 400);
        }
    
        $comment = Comment::create([
            'user_id' => $user->id,
            'project_id' => $request->input('project_id'),
            'petition_id' => $request->input('petition_id'), 
            'message' => $request->input('message'),
        ]);
    
        return response()->json($comment, 201); 
    }
    

    public function index(): JsonResponse
    {
        $comments = Comment::all();
        return response()->json($comments);
    }

    // Store a newly created comment in storage.
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
            'petition_id' => 'nullable|exists:petitions,id',
            'message' => 'required|string',
        ]);

        $comment = Comment::create($request->all());
        return response()->json($comment, 201); // 201 Created
    }

    // Display the specified comment.
    public function show($id): JsonResponse
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    // Update the specified comment in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'project_id' => 'sometimes|nullable|exists:projects,id',
            'petition_id' => 'sometimes|nullable|exists:petitions,id',
            'message' => 'sometimes|required|string',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($request->all());
        return response()->json($comment);
    }

    // Remove the specified comment from storage.
    public function destroy($id): JsonResponse
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

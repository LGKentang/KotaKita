<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
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

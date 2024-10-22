<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VoteController extends Controller
{
    // Display a listing of the votes.
    public function index(): JsonResponse
    {
        $votes = Vote::all();
        return response()->json($votes);
    }

    // Store a newly created vote in storage.
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'vote_type' => 'required|in:upvote,downvote',
            'petition_id' => 'required|exists:petitions,id',
            'user_id' => 'required|exists:users,id', // Ensure you validate the user ID
        ]);

        $vote = Vote::create($request->all());
        return response()->json($vote, 201); // 201 Created
    }

    // Display the specified vote.
    public function show($id): JsonResponse
    {
        $vote = Vote::findOrFail($id);
        return response()->json($vote);
    }

    // Update the specified vote in storage.
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'vote_type' => 'sometimes|required|in:upvote,downvote',
            'petition_id' => 'sometimes|required|exists:petitions,id',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $vote = Vote::findOrFail($id);
        $vote->update($request->all());
        return response()->json($vote);
    }

    // Remove the specified vote from storage.
    public function destroy($id): JsonResponse
    {
        $vote = Vote::findOrFail($id);
        $vote->delete();
        return response()->json(null, 204); // 204 No Content
    }
}

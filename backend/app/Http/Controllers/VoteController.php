<?php

namespace App\Http\Controllers;

use App\Models\Petition;
use App\Models\Vote;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VoteController extends Controller
{
    public function upvote(Request $request): JsonResponse
    {
        $request->validate([
            'petitionId' => 'required|integer',
        ]);

        $user = Auth::user();
        $petitionId = $request->input('petitionId');

        $existingVote = Vote::where('user_id', $user->id)
            ->where('petition_id', $petitionId)
            ->first();

        if ($existingVote) {
            if ($existingVote->vote_type === 'downvote') {
                $existingVote->update(['vote_type' => 'upvote']);

                $petition = Petition::find($petitionId);
                $petition->increment('upvotes');
                $petition->decrement('downvotes');

                return response()->json(['message' => 'Your vote has been updated to upvote.', 'vote' => $existingVote], 200);
            }

            return response()->json(['message' => 'You have already voted up for this petition.'], 400);
        }

        $vote = Vote::create([
            'user_id' => $user->id,
            'petition_id' => $petitionId,
            'vote_type' => 'upvote',
        ]);

        $petition = Petition::find($petitionId);
        $petition->increment('upvotes');
        $this->triggerCriteriaCheck($petition);

        return response()->json($vote, 201);
    }

    public function downvote(Request $request): JsonResponse
    {
        $request->validate([
            'petitionId' => 'required|integer|exists:petitions,id',
        ]);

        $user = Auth::user();
        $petitionId = $request->input('petitionId');

        $existingVote = Vote::where('user_id', $user->id)
            ->where('petition_id', $petitionId)
            ->first();

        if ($existingVote) {
            if ($existingVote->vote_type === 'upvote') {
                // Update the existing vote from upvote to downvote
                $existingVote->update(['vote_type' => 'downvote']);

                // Increment downvote and decrement upvote on petition
                $petition = Petition::find($petitionId);
                $petition->increment('downvotes');
                $petition->decrement('upvotes');

                return response()->json(['message' => 'Your vote has been updated to downvote.', 'vote' => $existingVote], 200);
            }

            return response()->json(['message' => 'You have already voted down for this petition.'], 400);
        }

        $vote = Vote::create([
            'user_id' => $user->id,
            'petition_id' => $petitionId,
            'vote_type' => 'downvote',
        ]);

        $petition = Petition::find($petitionId);
        $petition->increment('downvotes');
        $this->triggerCriteriaCheck($petition);

        return response()->json($vote, 201);
    }

    public function triggerCriteriaCheck($petition): JsonResponse
    {
        if (in_array($petition->status, ['Open for consideration', 'Invalidated'])) {
            return response()->json([
                'message' => 'This petition has already been finalized and cannot be changed.',
                'status' => $petition->status
            ]);
        }

        $difference = $petition->upvotes - $petition->downvotes;

        if ($difference > 5) {

            $petition->update(['status' => 'Open for consideration']);
            PetitionInstituteController::createPetitionInstitutePivotTables($petition->id);

            return response()->json([
                'message' => 'The difference between upvotes and downvotes is larger than 5. Petition status updated to "open for consideration".',
                'status' => $petition->status
            ]);
        }

        $petition->update(['status' => 'Invalidated']);

        return response()->json([
            'message' => 'The difference between upvotes and downvotes is 5 or less. Petition status updated to "Invalidated".',
            'difference' => $difference,
            'status' => $petition->status
        ]);
    }


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

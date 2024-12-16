<?php

namespace App\Http\Controllers;

use App\Models\Institute;
use App\Models\Petition;
use App\Models\PetitionInstitute;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PetitionInstituteController extends Controller
{
    public function getOffers(): JsonResponse
    {
        $user = Auth::user();
    
        if (!$user || $user->role != 'institute') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Only institutes can view offers.',
            ], 403);
        }
    

        $pendingPetitions = PetitionInstitute::where('status', 'Pending')
        ->where('institute_id', $user->institute_id) 
        ->get();
        return response()->json([
            'success' => true,
            'data' => $pendingPetitions,
        ], 200);
    }
    


    public static function createPetitionInstitutePivotTables($petitionId): JsonResponse
    {
        $petition = Petition::find($petitionId);
        if (!$petition) {
            return response()->json(['message' => 'Petition not found.'], 404);
        }

        $institutes = Institute::all();
        foreach ($institutes as $institute) {
            PetitionInstitute::firstOrCreate([
                'petition_id' => $petitionId,
                'institute_id' => $institute->id,
            ], [
                'status' => 'Pending',
            ]);
        }

        return response()->json([
            'message' => 'Pivot table entries created for all institutes.',
            'petition_id' => $petitionId,
            'total_institutes' => $institutes->count(),
        ]);
    }

    public function removeAllPetitionPivotTable($petitionId): JsonResponse
    {
        $petition = Petition::find($petitionId);
        if (!$petition) {
            return response()->json(['message' => 'Petition not found.'], 404);
        }

        PetitionInstitute::where('petition_id', $petitionId)->delete();

        return response()->json([
            'message' => 'All pivot table entries for this petition have been removed.',
            'petition_id' => $petitionId,
        ]);
    }


    public function updateStatus(Request $request): JsonResponse
    {
        $request->validate([
            'petition_id' => 'required|integer|exists:petitions,id',
            'status' => 'required|string',
        ]);
    
        $user = Auth::user();
    
        if ($user->role != 'institute') {
            return response()->json(['message' => 'Unauthorized: Only institutes can update the status.'], 403);
        }
    
        $record = PetitionInstitute::where('petition_id', $request->petition_id)
            ->where('institute_id', $user->institute_id)
            ->first();
    
        if (!$record) {
            return response()->json(['message' => 'Petition not found for your institute.'], 404);
        }
    
        $status = ucfirst(strtolower($request->status));
    
        if (!in_array($status, ['Pending', 'Declined', 'Accepted'])) {
            return response()->json(['message' => 'Invalid status provided.'], 422);
        }
    
        // If the petition's status is already 'Declined', prevent modification
        if ($record->status === 'Declined') {
            return response()->json(['message' => 'Cannot modify the status of a declined petition.'], 403);
        }
    
        if ($record->status === $status) {
            return response()->json([
                'message' => "Status is already '{$status}'."
            ], 200);
        }
    
        $record->update(['status' => $status]);
    
        if ($status === 'Accepted') {
            $petition = Petition::find($request->petition_id);
            if ($petition) {
                $petition->institute_id = $user->institute_id;
                $petition->status = "Accepted";  
                $petition->save();
            }
    
            $this->removeAllPetitionPivotTable($request->input('petition_id'));
    
            return response()->json([
                'message' => 'Status updated to "Accepted" and petition institute_id updated.',
                'data' => $record,
            ]);
        }
    
        return response()->json([
            'message' => 'Status updated successfully.',
            'data' => $record,
        ]);
    }
    
    
}

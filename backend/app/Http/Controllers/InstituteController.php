<?php

namespace App\Http\Controllers;

use App\Models\Institute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstituteController extends Controller
{
    // Create a new institute
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $institute = Institute::create($request->all());
        return response()->json($institute, 201);
    }

    // Get all institutes
    public function index()
    {
        $institutes = Institute::all();
        return response()->json($institutes);
    }

    // Get a single institute by ID
    public function show($id)
    {
        $institute = Institute::find($id);

        if (!$institute) {
            return response()->json(['message' => 'Institute not found'], 404);
        }

        return response()->json($institute);
    }

    // Update an institute
    public function update(Request $request, $id)
    {
        $institute = Institute::find($id);

        if (!$institute) {
            return response()->json(['message' => 'Institute not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'contact_number' => 'sometimes|required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $institute->update($request->all());
        return response()->json($institute);
    }

    // Delete an institute
    public function destroy($id)
    {
        $institute = Institute::find($id);

        if (!$institute) {
            return response()->json(['message' => 'Institute not found'], 404);
        }

        $institute->delete();
        return response()->json(['message' => 'Institute deleted successfully']);
    }
}

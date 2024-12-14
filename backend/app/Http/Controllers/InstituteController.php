<?php

namespace App\Http\Controllers;

use App\Models\Institute;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Log;
use Str;

class InstituteController extends Controller
{
    public function getInstituteProjects(Request $request)
    {
        $id = $request->query('id');

        $institutes = Institute::findOrFail($id);
        $projects = $institutes->projects;

        return response()->json([
            'institute' => $institutes,
            'projects' => $projects
        ]);
    }

    public function updateInstitute(Request $request)
    {
        $id = $request->input('id');
    
        $institute = Institute::find($id);
    
        if (!$institute) {
            return response()->json(['message' => 'Institute not found'], 404);
        }
        
        // Exclude 'name' field from the update data
        $data = $request->except('name');
    
        $validator = Validator::make($data, [
            'contact_number' => 'sometimes|required|string|max:15',
            'slogan' => 'nullable|string',
            'impact_description' => 'nullable|string',
            'founded_on' => 'nullable|date',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoFileName = Str::uuid() . '.' . $logo->getClientOriginalExtension();
            $data['logo_url'] = $logo->storeAs('institutes', $logoFileName, 'public');
        }
    
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $data['thumbnail_url'] = $thumbnail->storeAs('institutes', $thumbnailFileName, 'public');
        }
    
        $institute->update($data);
    
        return response()->json($institute);
    }
    

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

        $userEmail = strtolower(str_replace(' ', '', $institute->name)) . '@gmail.com'; 
    
        $user = User::factory()->create([
            'name' => $institute->name, 
            'email' => $userEmail, 
            'phone_number' => $request->input('contact_number'), 
            'role' => 'institute', 

        ]);

        $user->institute_id =  $institute->id;
        $user->save();
        
        return response()->json([
            'institute' => $institute,
            'user' => $user
        ], 201);
    }
    


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
    public function update(Request $request)
    {
        $id = $request->input('institute');
    
        $institute = Institute::find($id);
    
        if (!$institute) {
            return response()->json(['message' => 'Institute not found'], 404);
        }
        
        // Exclude 'name' field from the update data
        $data = $request->except('name');
    
        $validator = Validator::make($data, [
            'contact_number' => 'sometimes|required|string|max:15',
            'slogan' => 'nullable|string',
            'impact_description' => 'nullable|string',
            'founded_on' => 'nullable|date',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoFileName = Str::uuid() . '.' . $logo->getClientOriginalExtension();
            $data['logo_url'] = $logo->storeAs('institutes', $logoFileName, 'public');
        }
    
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $data['thumbnail_url'] = $thumbnail->storeAs('institutes', $thumbnailFileName, 'public');
        }
    
        $institute->update($data);
    
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

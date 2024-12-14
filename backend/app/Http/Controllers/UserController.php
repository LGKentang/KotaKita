<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Auth;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'phone_number' => 'nullable|string|max:15',
            'date_of_birth' => 'nullable|date',
            'profile_picture' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('profile_pictures', $filename, 'public');
            $profilePictureUrl = Storage::url($filePath);

            // Update profile picture URL
            $user->profile_picture_url = $profilePictureUrl;
        }

        // Update other fields
        $user->fill($request->only([
            'name',
            'phone_number',
            'date_of_birth',
        ]));

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
            'data' => $request
        ]);
    }
}

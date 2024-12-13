<?php

namespace App\Services;

use Illuminate\Support\Str;

class FileServiceProvider
{
    /**
     * Save an image to the public storage and return the file path.
     *
     * @param \Illuminate\Http\UploadedFile $image
     * @param string $directory
     * @return string|null
     */
    public static function saveImage($image, $directory = 'images'): ?string
    {
        // Generate a unique file name
        $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();

        // Store the file in the specified directory
        return $image->storeAs($directory, $fileName, 'public');
    }
}

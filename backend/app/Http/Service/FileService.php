<?php

namespace App\Services;

use Illuminate\Support\Str;

class FileService
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
        $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs($directory, $fileName, 'public');
    }
}

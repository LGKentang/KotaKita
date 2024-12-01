'use client';
import { useState, useCallback } from 'react';
import { Button } from '@/components/shared/Button';
import Dropzone from '@/components/shared/Dropzone';
import Image from 'next/image';

export default function CreatePetition() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);

    const objectUrl = URL.createObjectURL(newFile);
    setPreview(objectUrl);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-2 font-semibold text-white">
      <form className="my-5 flex w-1/2 flex-col gap-2 rounded-3xl bg-slate-800 p-2 shadow-xl">
        <div className="flex justify-center p-3">
          <h1 className="text-4xl text-white">Create your petition</h1>
        </div>
        <div className="flex w-full flex-col gap-2 px-4">
          <label className="">Insert Petition Title</label>
          <input type="text" className="h-8 w-full rounded-lg bg-gray-700" />
        </div>
        <div className="flex w-full flex-col gap-2 px-4">
          <p>Petition Description</p>
          <textarea className="min-h-12 w-full rounded-lg bg-slate-600 p-2" />
        </div>
        <div className="px-4 py-2">
          <p className="text-white">Selected Image Preview</p>
          {preview ? (
            <Image
              src={preview}
              alt="Image Preview"
              height={400}
              width={400}
              className="mt-2 h-auto max-w-full rounded"
            />
          ) : (
            <Image
              src="/assets/missing_image.avif"
              alt="No Image Selected"
              height={400}
              width={400}
              className="mt-2 h-auto max-w-full rounded"
            />
          )}
        </div>
        <div className="px-3 py-2">
          <Dropzone
            className="rounded-lg bg-blue-600 p-2 duration-300 hover:bg-blue-400"
            onDrop={onDrop}
          />
        </div>
        <Button className="rounded-lg text-black">Submit</Button>
      </form>
    </div>
  );
}

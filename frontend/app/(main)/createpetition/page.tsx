'use client';
import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import { Switch, Transition } from '@headlessui/react';
import { AddPetition } from '@/libs/actions/petitions.action';
import { useRouter } from 'next/navigation';

export default function CreatePetition() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    thumbnail: null as File | null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        thumbnail: newFile,
      }));
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      const newFile = event.dataTransfer.files[0];
      setFormData((prevState) => ({
        ...prevState,
        thumbnail: newFile,
      }));
    }
  }, []);

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, status, thumbnail } = formData;

    if (!title || !description || !thumbnail || !status) {
      alert("Please fill in all fields and upload a thumbnail.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("title", title);
    formDataObj.append("description", description);
    formDataObj.append("status", status);
    formDataObj.append("submissionDate", new Date().toISOString().split('T')[0]);
    formDataObj.append("thumbnail", thumbnail);

    try {
      const result = await AddPetition(formDataObj, localStorage.getItem('token'));
      console.log("Petition created successfully:", result);
      setUploadSuccess(true); // Set upload success state to true
    } catch (err) {
      console.error("Error creating petition:", err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6 font-semibold text-white">

      {uploadSuccess ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-green-500">Petition Created Successfully!</h1>
          <p className="text-xl text-gray-300 mb-6">Your petition has been successfully submitted.</p>
          <Button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400"
            onClick={() => router.push('/')}
          >
            Go to Homepage
          </Button>
        </div>

      ) : (
        <form
          onSubmit={handleSubmit}
          className="my-5 flex w-full max-w-3xl flex-col gap-4 rounded-3xl bg-slate-800 p-6 shadow-2xl"
        >
          <div className="flex justify-center p-3">
            <h1 className="text-4xl font-bold text-white">Create Your Petition</h1>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <label className="text-lg">Petition Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="h-10 w-full rounded-lg border-none bg-gray-700 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter petition title..."
            />
          </div>

          <div className="flex flex-col gap-2 px-4">
            <label className="text-lg">Petition Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-24 w-full rounded-lg border-none bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your petition..."
            />
          </div>

          <div className="p-4">
            <div
              onClick={handleDropzoneClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`relative flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${isDragging ? 'border-blue-400 bg-blue-950' : 'border-gray-500'
                } transition duration-300`}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.thumbnail ? (
                <Image
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Image Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <p className="text-center text-gray-300">
                  Drag & Drop or <span className="underline">Click</span> to upload an image
                </p>
              )}

              <Transition
                show={isDragging}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-blue-600/30 rounded-lg">
                  <p className="text-lg font-bold text-white">Drop your image here!</p>
                </div>
              </Transition>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-lg">Petition Visibility:</span>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.status === 'Closed'}
                onChange={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    status: prevState.status === 'Open' ? 'Closed' : 'Open',
                  }))
                }
                className={`${formData.status === 'Closed' ? 'bg-red-600' : 'bg-green-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${formData.status === 'Closed' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <span className="text-sm text-gray-300">
                {formData.status === 'Closed' ? 'Closed' : 'Open'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center px-4 py-2">
            <Button className="rounded-lg bg-blue-500 px-5 py-2 text-white transition hover:bg-blue-400">
              Submit Petition
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

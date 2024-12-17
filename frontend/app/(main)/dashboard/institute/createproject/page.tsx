'use client';

import { FormEvent, useState } from 'react';
import { AddProject } from '@/libs/actions/projects.action';

export default function CreateProject() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Safely retrieve the token on the client side
  useState(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      // Extract and validate form fields
      const name = formData.get('name') as string;
      const startDate = formData.get('start') as string;
      const endDate = formData.get('end') as string;
      const budget = formData.get('budget') as string;
      const desc = formData.get('desc') as string;
      const thumbnailFile = formData.get('thumbnail') as File;

      if (
        !name ||
        !startDate ||
        !endDate ||
        !budget ||
        !desc ||
        !thumbnailFile
      ) {
        alert('Please fill in all fields!');
        setLoading(false);
        return;
      }

      // Prepare FormData for submission
      const projectData = new FormData();
      projectData.append('name', name);
      projectData.append('startDate', startDate);
      projectData.append('endDate', endDate);
      projectData.append('budget', budget);
      projectData.append('desc', desc);
      projectData.append('thumbnail', thumbnailFile);

      // Ensure token exists before making API call
      if (!token) {
        alert('User is not authenticated!');
        setLoading(false);
        return;
      }

      // Make API call
      const res = await AddProject(projectData, token);

      // Success handling
      alert('Project created successfully!');
      console.log('Response:', res);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred while creating the project.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Create a New Project
        </h1>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Project name"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {/* Dates */}
        <div className="mt-4 flex gap-4">
          <div>
            <label htmlFor="start" className="block text-sm font-medium">
              Start Date
            </label>
            <input
              type="date"
              name="start"
              id="start"
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="end" className="block text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              name="end"
              id="end"
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="mt-4">
          <label htmlFor="budget" className="block text-sm font-medium">
            Budget
          </label>
          <select
            name="budget"
            id="budget"
            className="w-full rounded border px-3 py-2"
          >
            <option value="1000000">Rp. 1.000.000</option>
            <option value="5000000">Rp. 5.000.000</option>
            <option value="10000000">Rp. 10.000.000</option>
            <option value="100000000">Rp. 100.000.000</option>
          </select>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label htmlFor="desc" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            rows={4}
            placeholder="Project description"
            className="w-full rounded border px-3 py-2"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium">
            Upload Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            className="mt-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}

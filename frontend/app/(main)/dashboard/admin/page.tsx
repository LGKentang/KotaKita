'use client';
import { useState, useEffect } from 'react';
import { CreateInstitute, GetAllInstitutes } from '@/libs/actions/institute.action'; // Assuming this function exists
import { Institute } from '@/libs/types/institute.type'; // Assuming the Institute type is defined

export default function AdminDashboard() {
  const [name, setName] = useState<string>('');
  const [contact_number, setContactNumber] = useState<string>('');
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch institutes
  const fetchInstitutes = async () => {
    try {
      const data = await GetAllInstitutes(); // Fetch institutes from the backend
      setInstitutes(data);
    } catch (err) {
      setError('Failed to fetch institutes');
      console.error(err);
    }
  };

  // Fetch institutes when the component mounts
  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleAddInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !contact_number) {
      setError('Both fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await CreateInstitute(name, contact_number, localStorage.getItem('token')); // Assuming no authentication needed here
      if (response.error) {
        setError(response.message);
      } else {
        setInstitutes((prev) => [...prev, response]); // Add the new institute to the list
        setName('');
        setContactNumber('');
        await fetchInstitutes(); // Refetch the institutes after adding the new one
      }
    } catch (err) {
      setError('Failed to create institute');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      {/* Admin Dashboard Header */}
      <div className="text-3xl font-semibold text-center mb-8">
        Admin Dashboard
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Add Institute Card */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Add New Institute</h2>
          <form onSubmit={handleAddInstitute} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-black">Institute Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contact_number" className="block text-black">Contact Number</label>
              <input
                type="text"
                id="contact_number"
                value={contact_number}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? 'Creating...' : 'Create Institute'}
            </button>
          </form>
        </div>

        {/* Institutes List Card */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Institutes List</h2>
          {institutes.length === 0 ? (
            <p className="text-black">No institutes found</p>
          ) : (
            <div>
              {institutes.map((institute) => (
                <div
                  key={institute.id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={institute.logo_url}
                      alt={`${institute.name} logo`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-black">{institute.name}</h2>
                      <p className="text-sm text-black">{institute.founded_on} - {institute.id}</p>
                      <p className="text-black">{institute.impact_description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

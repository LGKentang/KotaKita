'use server';

export async function AddProject(formData: FormData, token: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:  'application/json'
      },
      body: formData,
    });

    if (!res.ok) {
      const errorResponse = await res.text();
      console.error("Server Error:", errorResponse); 
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }


    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error in AddProject:', err);
    throw err;
  }
}

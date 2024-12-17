'use server';

export async function AddProject(formData: FormData, token: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error in AddProject:', err);
    throw err;
  }
}

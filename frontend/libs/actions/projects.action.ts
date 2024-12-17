'use server';

export async function GetProjects() {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/projects`);
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function AddProject(formData: FormData, token: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log(res.text);
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

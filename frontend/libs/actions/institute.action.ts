'use server';

export async function GetInstitute(id: number) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/institutes/${id}`);
    if (!res.ok) {
      throw new Error(`Error getInstitute : ${res.status} `);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function GetAllInstitutes() {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/institutes`);
    if (!res.ok) {
      throw new Error(`Error getInstitute : ${res.status} `);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}



export async function CreateInstitute(name: string, contact_number: string, token: string | null) {
  try {
    // Early return if no token
    if (!token) {
      return { error: 'No token provided', message: 'Authorization token is required to create an institute.' };
    }

    // Proceed with API request only if token is provided
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token in the header
    };

    const res = await fetch(process.env.BACKEND_URI + `/institutes`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name,
        contact_number,
      }),
    });

    // If the response status is not ok, throw an error
    if (!res.ok) {
      throw new Error(`Error creating institute: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      return { error: 'Failed to create institute', message: err.message };
    }
    return { error: 'Failed to create institute', message: 'Unknown error occurred' };
  }
}

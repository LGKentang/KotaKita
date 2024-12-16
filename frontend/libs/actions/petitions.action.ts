'use server';

export async function GetAllPetitions() {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/petitions');
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function GetPetition(id: number) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/petitions/${id}`);
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function AddPetition(petitionsData: Object) {
  try {
    const res = await fetch(process.env.BACKEND_URL + '/petitions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petitionsData),
    });
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

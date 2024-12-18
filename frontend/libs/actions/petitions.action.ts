'use server';

import { IPetition } from '../types/petition.type';

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

export async function GetPetition(id: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/petitions/${id}`);
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error('Error fetching petition:', err);
    throw err;
  }
}

export async function AddPetition(formData: FormData, token: string | null) {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/petitions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export async function GetPetitionsByUser(token: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/getUserPetitions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }

    const data = await res.json();
    return data.petitions as IPetition[];
  } catch (err) {
    console.error('Error fetching petitions for user:', err);
    throw err;
  }
}

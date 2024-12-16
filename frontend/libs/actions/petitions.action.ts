'use server';

import api from "@/config/api";
import { PetitionForm } from "../types/petition.type";

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
    console.error('Error fetching petition:', err);
    throw err;
  }
}


export async function AddPetition(formData: FormData, token: string | null) {
  try {
    const res = await fetch(process.env.BACKEND_URL + '/petitions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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


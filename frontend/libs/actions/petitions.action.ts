'use server';

export async function GetAllPetitions() {
  try {
    const res = await fetch('http://localhost:8000/api/petitions');
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

export async function PostPetition() {}

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

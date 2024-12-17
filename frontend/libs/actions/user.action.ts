'use server';
export async function getUser(token: string) {
  try {
    if (!token) return;
    const res = await fetch(process.env.BACKEND_URI + `/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Error status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

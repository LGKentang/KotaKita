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
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(`Error status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    // Rethrow the error to be handled on the client side
    throw err;
  }
}

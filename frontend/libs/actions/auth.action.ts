'use server';
export async function login(email: string, password: string) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`Request failed: ${res.status}`, data);

      throw {
        message: 'Request failed',
        status: res.status,
        details: data,
      };
    }

    return { data };
  } catch (error) {
    // Log the error before returning it
    console.error('API Error:', error);
    return { error };
  }
}

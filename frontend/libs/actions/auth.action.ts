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
    console.error('API Error:', error);
    return { error };
  }
}
// auth.action.ts
export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  phone_number: string
) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
        phone_number,
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
    console.error('API Error:', error);
    return { error };
  }
}

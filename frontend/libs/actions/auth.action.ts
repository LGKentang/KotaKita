'use server';

export async function login(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error('Login failed:', error);
    throw error; 
  }
}

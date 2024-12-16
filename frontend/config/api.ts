export default async function api<T>(
  path: string,
  { headers, ...init }: RequestInit = {},
): Promise<{ data: T } | { error: unknown }> {
  try {
    const res = await fetch(process.env.BACKEND_URI + path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...init,
    });


    const data = await res.json();
    if (!res.ok) {
      // Log error for debugging
      console.error(`Request failed: ${res.status}`, data);

      // Throw error with meaningful details
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

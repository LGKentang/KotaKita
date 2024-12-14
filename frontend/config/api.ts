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
    const data = (await res.json()) as T;
    if (!res.ok)
      throw {
        message: 'Request failed',
        status: res.status,
        details: data,
      };

    return { data };
  } catch (error) {
    return { error };
  }
}

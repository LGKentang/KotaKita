'use server';
import api from '@/config/api';
import { User } from '../types/user.type';

export async function login(email: string, password: string) {
  const res = await api<{
    token: string;
    user: User;
  }>('/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if ('data' in res) {
    return res.data;
  }
  throw res.error;
}

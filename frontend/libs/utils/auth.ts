'use client'
import { useEffect } from 'react';
import { getUser } from '@/libs/actions/user.action';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function useAuthRedirect(router: AppRouterInstance) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token || token === 'null') {
        router.push('/login');
      } else {
        getUser(token)
          .then((userData: any) => {
            if (!userData) {
              router.push('/login');
            }
          })
          .catch((error: any) => {
            if (error.message === 'Unauthorized') {
              router.push('/login');
            }
          });
      }
    }
  }, [router]);
}

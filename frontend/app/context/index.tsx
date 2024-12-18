'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { User } from '@/libs/types/user.type';
import { getUser } from '@/libs/actions/user.action';

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function Wrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = {
    user,
    setUser,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    getUser(token)
      .then((data) => {
        // console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err);
        setUser(null);
      });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppContext must be used within a Wrapper');
  }
  return context;
}

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type AuthContextType = {
  id: string | null;
  token: string | null;
  setId: (id: string | null) => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function Wrapper({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');
    if (storedId) setId(storedId);
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ id, token, setId, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppContext must be used within a Wrapper');
  }
  return context;
}

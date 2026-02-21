import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Loading from '../pages/loading.jsx';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loading: boolean;
  user: User | null;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Al montar, verificar si hay sesión válida
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Llama a un endpoint que valide la cookie
      const res = await axios.get('http://localhost:4000/api/auth/valid-cookie', { withCredentials: true });
      if (res.data.valid == true) {
        const user = await axios.get('http://localhost:4000/api/auth/user-id', { withCredentials: true });
        console.log(user.data);
        setUser({
          id: user.data.id,
          name: user.data.nombre,
          email: user.data.email
        }); 
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: setIsAuthenticated, loading, user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
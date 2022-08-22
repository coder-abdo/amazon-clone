import React, { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import { AuthState } from './pages/types/auth.types';
export type AuthContextProps = {
  auth: AuthState;
  setAuth: React.Dispatch<AuthState>;
};
export const AuthContext = React.createContext<AuthContextProps | any>(null);
export const useAuth = () => useContext<AuthContextProps | any>(AuthContext);
type Props = {
  children?: React.ReactNode;
};
const initialState: AuthState = {
  isAuthenticated: !!Cookie.get('token') ?? false,
  user: null,
  token: Cookie.get('token') ?? '',
};
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

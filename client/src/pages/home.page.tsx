import React from 'react';
import Cookie from 'js-cookie';
import { useAuth } from '../authStore';
import { LogoutButton } from '../components/style/input';
import { Title } from '../components/style/shared';
export const Home = () => {
  const { auth, setAuth } = useAuth();
  const logout = () => {
    Cookie.remove('token');
    setAuth({
      ...auth,
      isAuthenticated: false,
      token: '',
    });
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          padding: '0 10px',
        }}
      >
        <LogoutButton value="logout" onClick={logout} />
      </div>

      <Title>home page</Title>
    </>
  );
};

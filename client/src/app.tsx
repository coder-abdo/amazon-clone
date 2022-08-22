import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Wrapper } from './components/wrapper';
import { GlobalStyles } from './global/global.style';
import { Home } from './pages/home.page';
import { Login } from './pages/login.page';
import { Register } from './pages/register.page';
import { theme } from './theme/theme';
import { LogoWrapper } from './global/amazon.logo';
import { AuthProvider } from './authStore';
import { ProtectedRoutes } from './components/protectedRoute';
export const App = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyles light />
        <AuthProvider>
          <Router>
            <LogoWrapper />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Wrapper>
  );
};

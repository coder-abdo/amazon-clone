import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authStore';
type ProtectedRoutesProps = {
  children?: React.ReactElement | any;
};
export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
}) => {
  const { auth } = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

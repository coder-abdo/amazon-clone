import React from 'react';

type WrapperProps = {
  children?: React.ReactNode;
};
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <main>{children}</main>;
};

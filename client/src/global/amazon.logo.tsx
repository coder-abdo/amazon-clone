import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const AmazonLogo = styled.span`
  display: inline-block;
  background-image: url('./amazon.png');
  background-repeat: no-repeat;
  background-position: 0 -129px;
  height: 31px;
  width: 115px;
  margin-bottom: 20px;
`;

export const LogoWrapper = () => (
  <Link to="/">
    <AmazonLogo />
  </Link>
);

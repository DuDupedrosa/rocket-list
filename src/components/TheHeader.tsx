import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo.svg';

const HeaderBg = styled.header`
  background: var(--gray-700);
  height: 200px;
  display: grid;
  place-items: center;
`;

function TheHeader() {
  return (
    <HeaderBg>
      <a href="#" target="_blank">
        <img src={Logo} alt="logo" />
      </a>
    </HeaderBg>
  );
}

export default TheHeader;

import styled from 'styled-components';

const HeaderBg = styled.header`
  background: var(--gray-700);
  height: 200px;
  display: grid;
  place-items: center;
`;

function TheHeader() {
  return <HeaderBg></HeaderBg>;
}

export default TheHeader;

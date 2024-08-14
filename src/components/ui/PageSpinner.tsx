import styled from 'styled-components';
import LoadingSpinner from './loadingSpinner';

const Container = styled.div`
  margin-top: 32px;
  display: grid;
  place-items: center;
`;

function PageSpinner() {
  return (
    <Container>
      <LoadingSpinner size="page" />
    </Container>
  );
}

export default PageSpinner;

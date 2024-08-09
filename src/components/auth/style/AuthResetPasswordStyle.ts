import styled from 'styled-components';
import { mediaQueries } from '../../../helpers/breakPoints';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
`;

export const ButtonBackContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 32px;

  button {
    max-width: 220px;
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  place-items: center;

  img {
    max-width: 280px;
    width: 100%;
  }
`;

export const Content = styled.div`
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--gray-100);
    margin-bottom: 8px;
    margin-top: 32px;
    text-align: center;

    @media ${mediaQueries.md} {
      font-size: 32px;
    }
  }

  p {
    font-size: 16px;
    color: var(--gray-300);
    font-weight: 400;
    text-align: center;
    max-width: 520px;
    line-height: 1.5;

    @media ${mediaQueries.md} {
      font-size: 18px;
    }
  }
`;

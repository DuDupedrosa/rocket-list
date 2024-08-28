import styled from 'styled-components';
import { mediaQueries } from '../../../helpers/breakPoints';

export const Container = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 72px;
  padding: 0px 32px 32px 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: var(--gray-100);
  margin-bottom: 64px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: var(--gray-300);
  margin-bottom: 24px;
`;

export const BasicInfoContainer = styled.div`
  div.form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @media ${mediaQueries.md} {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export const ButtonSubmitContainer = styled.div`
  margin-top: 32px;
  width: 160px;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: var(--gray-300);
  margin: 32px 0px 32px 0px;
`;

export const ChangePasswordWarningText = styled.p`
  font-size: 16px;
  color: var(--gray-300);
  line-height: 1.5;

  span {
    display: inline-block;
    text-decoration: underline;
    color: var(--mainBlue);
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      color: var(--gray-200);
    }
  }
`;

export const AlertEditContainer = styled.div`
  margin-top: 20px;
`;

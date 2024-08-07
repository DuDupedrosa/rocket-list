import styled from 'styled-components';
import { mediaQueries } from '../../../helpers/breakPoints';

export const ResetPasswordLink = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-decoration: underline;
  font-size: 12px;
  color: var(--gray-300);
  margin-top: 4px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;

  :hover {
    color: var(--mainBlue);
  }
`;

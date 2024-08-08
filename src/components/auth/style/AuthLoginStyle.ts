import styled from 'styled-components';
import { mediaQueries } from '../../../helpers/breakPoints';

export const ResetPasswordLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    text-decoration: underline;
    font-size: 12px;
    color: var(--gray-300);
    margin-top: 4px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    padding: 8px;
    max-width: max-content;

    :hover {
      color: var(--mainBlue);
    }
  }
`;

export const IconEyePasswordContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;

  svg {
    cursor: pointer;
    color: var(--gray-100);
    width: 24px;
    height: 24px;
    transition: 0.3s;

    :hover {
      color: var(--gray-300);
    }
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
`;

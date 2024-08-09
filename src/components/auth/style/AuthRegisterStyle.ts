import styled from 'styled-components';

export const PasswordRulesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;

    div {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: var(--gray-300);
    }

    span {
      display: block;
      color: var(--gray-300);
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

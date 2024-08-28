import styled from 'styled-components';

export const InputGaps = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.div`
  margin-top: 32px;
  width: 160px;
`;

export const PasswordInputContainer = styled.div`
  position: relative;
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

export const AlertContainer = styled.div`
  margin-top: 32px;
`;

import styled from 'styled-components';

export const InputForm = styled.input`
  font-family: var(--family-text);
  font-size: 1rem;
  color: var(--gray-200);
  background-color: var(--gray-500);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  width: 100%;
  padding-left: 8px;
  height: 44px;
  transition: 0.3s;

  :focus {
    outline: none;
  }

  :hover,
  :focus {
    box-shadow: 0 0 0 2px var(--gray-300);
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--gray-300);
  margin-left: 4px;
  display: flex;
`;

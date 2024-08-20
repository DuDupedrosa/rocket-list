import styled from 'styled-components';

export const NewTaskBoxContainer = styled.div`
  background: #262626;
  border: 1px solid #333333;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 16px;
  margin-left: auto;
  margin-right: auto;
  gap: 8px;
  margin-bottom: 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
`;

interface TaskFinish {
  check: boolean;
}

export const NewTaskContent = styled.p`
  font-family: var(--family-text);
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
`;

interface ButtonsProps {
  svg: 'delete' | 'edit';
  disabled?: boolean;
}
export const Buttons = styled.div`
  div {
    svg {
      width: 20px;
      height: 20px;
      cursor: ${({ disabled }: ButtonsProps) =>
        disabled ? 'not-allowed' : 'pointer'};
      color: ${({ svg }: ButtonsProps) =>
        svg === 'delete' ? 'var(--red-400)' : 'var(--mainBlue)'};
      opacity: ${({ disabled }: ButtonsProps) => (disabled ? 0.2 : 1)};
    }

    padding: 2px;
    border-radius: 4px;
    transition: 0.3s;
    border: 1px solid transparent;
    cursor: ${({ disabled }: ButtonsProps) =>
      disabled ? 'not-allowed' : 'pointer'};

    :hover {
      border-color: ${({ disabled }: ButtonsProps) =>
        disabled ? 'transparent' : 'var(--gray-300)'};
    }
  }
`;

export const ActionsButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface ButtonCompleteTaskProps {
  disabled?: boolean;
}
export const ButtonCompleteTask = styled.div`
  svg {
    width: 20px;
    height: 20px;
    cursor: ${({ disabled }: ButtonCompleteTaskProps) =>
      disabled ? 'not-allowed' : 'pointer'};
    color: var(--mainBlue);
    transition: 0.3s;
    opacity: ${({ disabled }: ButtonCompleteTaskProps) => (disabled ? 0.2 : 1)};

    :hover {
      color: ${({ disabled }: ButtonCompleteTaskProps) =>
        disabled ? 'var(--mainBlue)' : 'var(--green-600)'};
    }
  }
`;

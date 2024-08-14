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
  text-decoration: ${(p: TaskFinish) => (p.check ? 'line-through' : 'none')};
`;

export const Buttons = styled.div`
  div {
    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
      color: ${({ svg }: { svg: 'delete' | 'edit' }) =>
        svg === 'delete' ? 'var(--red-400)' : 'var(--mainBlue)'};
    }

    padding: 2px;
    border-radius: 4px;
    transition: 0.3s;
    border: 1px solid transparent;
    cursor: pointer;
    :hover {
      border-color: var(--gray-300);
    }
  }
`;

export const ActionsButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

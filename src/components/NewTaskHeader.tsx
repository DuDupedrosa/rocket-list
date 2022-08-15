import styled from 'styled-components';

const NewTasHeaderkContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const HeaderNewTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TaskCreatedFollback = styled.p`
  font-family: var(--family-text);
  color: #4ea8de;
  font-weight: bold;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface PropsCount {
  width: string;
  height: string;
  padding?: string;
  radius: string;
}

const TaskCreatedFoolbackCount = styled.span`
  background: #333333;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 12px;
  color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p: PropsCount) => p.width};
  height: ${(p: PropsCount) => p.height};
  padding: ${(p: PropsCount) => (p.padding ? p.padding : '')};
  border-radius: ${(p: PropsCount) => p.radius};
`;

const TaskFinishedText = styled.p`
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 0.875rem;
  color: #8284fa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface headerProps {
  createdTask: number;
}

function NewTask({ createdTask }: headerProps) {
  return (
    <NewTasHeaderkContainer>
      <HeaderNewTask>
        <TaskCreatedFollback>
          Tarefas criadas
          <TaskCreatedFoolbackCount width="24px" height="24px" radius="8px">
            {createdTask}
          </TaskCreatedFoolbackCount>
        </TaskCreatedFollback>
        <TaskFinishedText>
          Concluídas
          <TaskCreatedFoolbackCount
            width="max-content"
            height="auto"
            radius="8px"
            padding="4px"
          >
            2 de 5
          </TaskCreatedFoolbackCount>
        </TaskFinishedText>
      </HeaderNewTask>
    </NewTasHeaderkContainer>
  );
}

export default NewTask;

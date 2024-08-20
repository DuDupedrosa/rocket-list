import styled from 'styled-components';
import Button from '../ui/buttons/Button';
import { useEffect, useState } from 'react';
import { taskStatusEnum } from '../../helpers/enums/task';
import { TaskStatusEnumType } from '../../types/task';

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

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface HeaderProps {
  createdTaskCount: number;
  onChangeStatus: (status: number) => void;
}

function NewTask({ createdTaskCount, onChangeStatus }: HeaderProps) {
  const [status, setStatus] = useState<number>(taskStatusEnum.PENDING);

  return (
    <NewTasHeaderkContainer>
      <HeaderNewTask>
        <TaskCreatedFollback>
          Tarefas criadas
          <TaskCreatedFoolbackCount width="24px" height="24px" radius="8px">
            {createdTaskCount}
          </TaskCreatedFoolbackCount>
        </TaskCreatedFollback>

        <ButtonsContainer>
          <Button
            onClick={() => {
              setStatus(taskStatusEnum.PENDING);
              onChangeStatus(taskStatusEnum.PENDING);
            }}
            fontSize="14px"
            borderColor={status === taskStatusEnum.COMPLETED ? '#1E6F9F' : ''}
            bg={status === taskStatusEnum.COMPLETED ? 'transparent' : '#1E6F9F'}
          >
            Pendentes
          </Button>
          <Button
            onClick={() => {
              setStatus(taskStatusEnum.COMPLETED);
              onChangeStatus(taskStatusEnum.COMPLETED);
            }}
            fontSize="14px"
            bg={status === taskStatusEnum.PENDING ? 'transparent' : '#1E6F9F'}
            borderColor={status === taskStatusEnum.PENDING ? '#1E6F9F' : ''}
          >
            Finalizadas
          </Button>
        </ButtonsContainer>
      </HeaderNewTask>
    </NewTasHeaderkContainer>
  );
}

export default NewTask;

import styled from 'styled-components';
import { Trash } from 'phosphor-react';

const NewTaskBoxContainer = styled.div`
  background: #262626;
  border: 1px solid #333333;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 8px;
  margin-bottom: 1.25rem;
`;

const NewTaskCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #4ea8de;
`;

const NewTaskContent = styled.p`
  font-family: var(--family-text);
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
`;

interface taskProps {
  task: string;
  handleDeleteTask: (taskToDelete: string) => void;
  handleCompleteTask: (taskComplete: string) => void;
}

function NewTaskBox({ task, handleDeleteTask, handleCompleteTask }: taskProps) {
  return (
    <NewTaskBoxContainer>
      <NewTaskCircle onClick={() => handleCompleteTask(task)} />
      <NewTaskContent>{task}</NewTaskContent>
      <div onClick={() => handleDeleteTask(task)}>
        <Trash width={24} height={24} color="#808080" cursor="pointer" />
      </div>
    </NewTaskBoxContainer>
  );
}

export default NewTaskBox;

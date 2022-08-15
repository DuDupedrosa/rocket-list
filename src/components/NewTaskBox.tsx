import styled from 'styled-components';
import { Trash, CheckCircle, Circle } from 'phosphor-react';
import { useState } from 'react';

const NewTaskBoxContainer = styled.div`
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

const NewTaskContent = styled.p`
  font-family: var(--family-text);
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
  text-decoration: ${(p: TaskFinish) => (p.check ? 'line-through' : 'none')};
`;

interface TaskProps {
  task: string;
  handleDeleteTask: (taskToDelete: string) => void;
}

function NewTaskBox({ task, handleDeleteTask }: TaskProps) {
  const [checkFinish, setCheckFinish] = useState(false);

  return (
    <NewTaskBoxContainer>
      {checkFinish ? (
        <CheckCircle
          width={24}
          height={24}
          color="#4ea8de"
          cursor="pointer"
          onClick={() => setCheckFinish(false)}
        />
      ) : (
        <Circle
          width={24}
          height={24}
          color="#4ea8de"
          cursor="pointer"
          onClick={() => setCheckFinish(true)}
        />
      )}
      <NewTaskContent check={checkFinish}>{task}</NewTaskContent>
      <div onClick={() => handleDeleteTask(task)}>
        <Trash width={24} height={24} color="#808080" cursor="pointer" />
      </div>
    </NewTaskBoxContainer>
  );
}

export default NewTaskBox;

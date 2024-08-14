import { Trash, CheckCircle, Circle, Pencil } from 'phosphor-react';
import { useState } from 'react';
import { CreatedTask } from '../../types/task';
import * as taskBoxStyled from './style/NewTaskStyle';

interface TaskProps {
  task: CreatedTask;
  handleEditTask: (taskToEdit: CreatedTask) => void;
  handleDeleteTask: (taskToDelete: CreatedTask) => void;
}

function NewTaskBoxLogged({
  task,
  handleDeleteTask,
  handleEditTask,
}: TaskProps) {
  const [checkFinish, setCheckFinish] = useState(false);

  return (
    <taskBoxStyled.NewTaskBoxContainer>
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
          data-test="NewTaskBox:ButtonCompleteTask"
          width={24}
          height={24}
          color="#4ea8de"
          cursor="pointer"
          onClick={() => setCheckFinish(true)}
        />
      )}

      <taskBoxStyled.NewTaskContent check={checkFinish}>
        {task.value}
      </taskBoxStyled.NewTaskContent>

      <taskBoxStyled.ActionsButtonsContainer>
        <taskBoxStyled.Buttons onClick={() => handleEditTask(task)} svg="edit">
          <div>
            <Pencil size={24} />
          </div>
        </taskBoxStyled.Buttons>
        <taskBoxStyled.Buttons
          svg="delete"
          data-test="NewTaskBox:ButtonDeleteTask"
          onClick={() => handleDeleteTask(task)}
        >
          <div>
            <Trash size={24} />
          </div>
        </taskBoxStyled.Buttons>
      </taskBoxStyled.ActionsButtonsContainer>
    </taskBoxStyled.NewTaskBoxContainer>
  );
}

export default NewTaskBoxLogged;

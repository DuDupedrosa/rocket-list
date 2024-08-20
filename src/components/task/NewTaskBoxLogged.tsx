import { Trash, CheckCircle, Circle, Pencil, Gear } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { CreatedTask } from '../../types/task';
import * as taskBoxStyled from './style/NewTaskStyle';
import { taskStatusEnum } from '../../helpers/enums/task';

interface TaskProps {
  task: CreatedTask;
  handleEditTask: (taskToEdit: CreatedTask) => void;
  handleDeleteTask: (taskToDelete: CreatedTask) => void;
  handleCompleteTask: (taskToDelete: CreatedTask) => void;
}

function NewTaskBoxLogged({
  task,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}: TaskProps) {
  const [disabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (task !== null && task.status === taskStatusEnum.COMPLETED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [task]);
  return (
    <taskBoxStyled.NewTaskBoxContainer>
      <taskBoxStyled.ButtonCompleteTask
        onClick={() => {
          if (!disabled) {
            handleCompleteTask(task);
          }
        }}
        disabled={disabled}
      >
        <Gear
          data-test="NewTaskBox:ButtonCompleteTask"
          width={20}
          height={20}
        />
      </taskBoxStyled.ButtonCompleteTask>

      <taskBoxStyled.NewTaskContent>{task.value}</taskBoxStyled.NewTaskContent>

      <taskBoxStyled.ActionsButtonsContainer>
        <taskBoxStyled.Buttons
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              handleEditTask(task);
            }
          }}
          svg="edit"
        >
          <div>
            <Pencil size={24} />
          </div>
        </taskBoxStyled.Buttons>
        <taskBoxStyled.Buttons
          svg="delete"
          data-test="NewTaskBox:ButtonDeleteTask"
          onClick={() => {
            handleDeleteTask(task);
          }}
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

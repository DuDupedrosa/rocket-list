import { Trash, CheckCircle, Circle, Pencil } from 'phosphor-react';
import { useState } from 'react';
import { CreateTaskType } from '../../types/task';
import * as taskBoxStyled from './style/NewTaskStyle';
import { toast } from 'sonner';

interface TaskProps {
  task: CreateTaskType;
}

function NewTaskBox({ task }: TaskProps) {
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

      <taskBoxStyled.NewTaskContent>{task.value}</taskBoxStyled.NewTaskContent>

      <taskBoxStyled.ActionsButtonsContainer>
        <taskBoxStyled.Buttons
          onClick={() => {
            toast.info(
              'Para editar/deletar uma tarefa você precisa estar logado na plataforma'
            );
          }}
          svg="edit"
        >
          <div>
            <Pencil size={24} />
          </div>
        </taskBoxStyled.Buttons>
        <taskBoxStyled.Buttons
          onClick={() => {
            toast.info(
              'Para deletar uma tarefa você precisa estar logado na plataforma'
            );
          }}
          svg="delete"
          data-test="NewTaskBox:ButtonDeleteTask"
        >
          <div>
            <Trash size={24} />
          </div>
        </taskBoxStyled.Buttons>
      </taskBoxStyled.ActionsButtonsContainer>
    </taskBoxStyled.NewTaskBoxContainer>
  );
}

export default NewTaskBox;

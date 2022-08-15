import styled, { keyframes } from 'styled-components';
import { Plus } from 'phosphor-react';
import NewTaskHeader from './NewTaskHeader';
import NewTaskBox from './NewTaskBox';
import { FormEvent, useEffect, useState } from 'react';
import NotHaveTaskImg from '../assets/imgs/Clipboard.png';

const AddNewTaskContainer = styled.div`
  padding: 0 20px;
  width: 100%;
`;

const FormTask = styled.form`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  max-width: 700px;
  margin-top: -30px !important;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 64px;
  position: relative;
`;

const FormTaskInputText = styled.input`
  font-family: var(--family-text);
  font-size: 1rem;
  line-height: 1.4;
  color: var(--gray-300);
  background-color: var(--gray-500);
  border: 1px solid var(--gray-700);
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  transition: 0.3s;

  :focus {
    outline: none;
  }

  :hover,
  :focus {
    box-shadow: 0 0 0 4px var(--gray-500);
  }
`;

const FormTaskButtonSubmit = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
  background-color: #1e6f9f;
  border-radius: 8px;
  padding: 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  :hover,
  :focus {
    box-shadow: 0 0 0 4px #1e6f9f;
    outline: none;
  }
`;

const BorderIconAdd = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonCleanTasks = styled.button`
  display: block;
  font-family: var(--family-text);
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #f2f2f2;
  background-color: #1e6f9f;
  border-radius: 8px;
  padding: 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  width: 120px;
  position: absolute;
  right: 0;

  :hover,
  :focus {
    box-shadow: 0 0 0 4px #1e6f9f;
    outline: none;
  }
`;

const animeLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-40px,0,0);
  }

  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

const AlertLimitTask = styled.p`
  font-size: 12px;
  font-family: var(--family-text);
  line-height: 1.5;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.015rem;
  background-color: #1e6f9f;
  max-width: max-content;
  padding: 0.2rem;
  border-radius: 4px;
  position: absolute;
  z-index: 9999;
  top: -40px;
  animation: ${animeLeft} 0.4s forwards;
`;

const Teste = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const NotHaveTaskBox = styled.div`
  margin-top: 40px;
  max-width: 100%;
  border-top: 1px solid #333333;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
`;

interface TextBold {
  isBold: boolean;
}

const NotHaveTaskContent = styled.div`
  margin-top: 1rem;

  p + p {
    margin-top: 0.4rem;
  }
`;

const NotHaveTaskImgBox = styled.div`
  margin-top: 40px;
`;

const NotHaveTaskText = styled.p`
  font-family: var(--family-text);
  font-size: 1rem;
  line-height: 1.4;
  text-align: center;
  color: #808080;
  font-weight: ${(p: TextBold) => (p.isBold ? '700' : '400')};
`;

function addNewTask() {
  const [newTask, setNewTask] = useState([] as any);
  const [task, setTask] = useState('');
  const [createdTask, setCreatedTask] = useState(0);
  const [alertOfLimite, setAlertOfLimite] = useState('');

  // method that add the task in the array of tasks
  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    if (task) {
      if (newTask.length < 3) {
        setNewTask([...newTask, task]);
        setTask('');
      } else {
        setAlertOfLimite('Ops!! Limite de tasks atingido');
        setTimeout(() => {
          setAlertOfLimite('');
        }, 2000);
      }
    }
  }

  // method to delete the task where there was the event of click
  function handleDeleteTask(task: string) {
    const newTasksAfterDelete = newTask.filter((item: string) => {
      return item !== task;
    });
    setNewTask(newTasksAfterDelete);

    // removendo do localStorage
    const getDataInLocalStorage = localStorage.getItem('userSaveTasks');
    if (getDataInLocalStorage !== null) {
      const cleanData = JSON.parse(getDataInLocalStorage);
      const newTask = cleanData.newTask.filter((item: string) => {
        return item !== task;
      });

      const newSaveTask = JSON.stringify({ newTask });
      localStorage.setItem('userSaveTasks', newSaveTask);
    }
  }

  // clean the data save
  function handleCleanLocalStorage() {
    const checkLocalStorage = localStorage.getItem('userSaveTasks');

    if (checkLocalStorage !== null) {
      localStorage.removeItem('userSaveTasks');
      setNewTask([]);
    }
  }

  // effect that update the state of how tasks created
  useEffect(() => {
    setCreatedTask(newTask.length);

    // save in localStorage the new task
    if (newTask.length > 0) {
      const saveTask = JSON.stringify({ newTask });
      localStorage.setItem('userSaveTasks', saveTask);
    }
  }, [newTask]);

  // always a reload this effect check in the localStorage if there is task
  // if there is the effect start the method that get the task save in locaStorage
  useEffect(() => {
    // checking if there are tasks save in localstorage
    const getDataInLocalStorage = localStorage.getItem('userSaveTasks');
    if (getDataInLocalStorage !== null) {
      const cleanData = JSON.parse(getDataInLocalStorage);
      setNewTask([...newTask, ...cleanData.newTask]);
    }
  }, []);

  return (
    <AddNewTaskContainer>
      <FormTask onSubmit={handleNewTask}>
        <FormTaskInputText
          placeholder="Adicione uma nova tarefa"
          type="text"
          required
          name="newTask"
          id="newTask"
          onChange={({ target }) => setTask(target.value)}
          value={task}
        />
        <FormTaskButtonSubmit>
          Criar
          <BorderIconAdd>
            <Plus color="#f2f2f2" width={12} height={12} />
          </BorderIconAdd>
        </FormTaskButtonSubmit>
        {alertOfLimite && <AlertLimitTask>{alertOfLimite}</AlertLimitTask>}
      </FormTask>
      <NewTaskHeader createdTask={createdTask} />
      {newTask.length <= 0 && (
        <NotHaveTaskBox>
          <NotHaveTaskImgBox>
            <img src={NotHaveTaskImg} />
          </NotHaveTaskImgBox>
          <NotHaveTaskContent>
            <NotHaveTaskText isBold={true}>
              Você ainda não tem tarefas cadastradas
            </NotHaveTaskText>
            <NotHaveTaskText isBold={false}>
              Crie tarefas e organize seus itens a fazer
            </NotHaveTaskText>
          </NotHaveTaskContent>
        </NotHaveTaskBox>
      )}
      <Teste>
        {newTask.length > 0 &&
          newTask.map((task: string, index: number) => {
            return (
              <NewTaskBox
                task={task}
                key={index}
                handleDeleteTask={handleDeleteTask}
              />
            );
          })}
        {newTask.length > 0 && (
          <ButtonCleanTasks onClick={handleCleanLocalStorage}>
            Zerar
          </ButtonCleanTasks>
        )}
      </Teste>
    </AddNewTaskContainer>
  );
}

export default addNewTask;

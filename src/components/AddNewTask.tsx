import styled from 'styled-components';
import { Plus } from 'phosphor-react';
import NewTaskHeader from './NewTaskHeader';
import NewTaskBox from './NewTaskBox';
import React, { FormEvent, useEffect, useState } from 'react';

const FormTask = styled.form`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  max-width: 700px;
  margin-top: -30px !important;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 64px;
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
  bottom: -100px;
  right: 415px;

  :hover,
  :focus {
    box-shadow: 0 0 0 4px #1e6f9f;
    outline: none;
  }
`;

const AddNewTaskContainer = styled.div`
  position: relative;
`;
function addNewTask() {
  const [newTask, setNewTask] = useState([] as any);
  const [task, setTask] = useState('');
  const [createdTask, setCreatedTask] = useState(0);
  const [completeTask, setCompleteTask] = useState([] as any);
  const [alertOfLimite, setAlertOfLimite] = useState('');

  // method that add the task in the array of tasks
  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    if (task) {
      if (newTask.length < 5) {
        setNewTask([...newTask, task]);
        setTask('');
        console.log(newTask);
      } else {
        setAlertOfLimite(
          'Limite de tarefas atingidas, termine suas tarefas para criar ou novas, ou remova alguma tarefa para adicionar uma nova'
        );
      }
    }
  }

  // method to delete the task where there was the event of click
  function handleDeleteTask(task: string) {
    const newTasksAfterDelete = newTask.filter((item: string) => {
      return item !== task;
    });

    setNewTask(newTasksAfterDelete);

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

  function handleCompleteTask(task: string) {
    setCompleteTask([...completeTask, task]);
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
      {alertOfLimite && <p>{alertOfLimite}</p>}

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
      </FormTask>
      <NewTaskHeader createdTask={createdTask} />
      {newTask.length > 0 &&
        newTask.map((task: string, index: number) => {
          return (
            <NewTaskBox
              task={task}
              key={index}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          );
        })}
      {newTask.length > 0 && (
        <ButtonCleanTasks onClick={handleCleanLocalStorage}>
          Zerar
        </ButtonCleanTasks>
      )}
    </AddNewTaskContainer>
  );
}

export default addNewTask;

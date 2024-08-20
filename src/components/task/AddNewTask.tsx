import styled, { keyframes } from 'styled-components';
import { Plus } from 'phosphor-react';
import NewTaskHeader from './NewTaskHeader';
import NewTaskBox from './NewTaskBox';
import { FormEvent, useEffect, useState } from 'react';
import NotHaveTaskImg from '../../assets/imgs/Clipboard.png';
import { toast } from 'sonner';
import AlertComponent from '../ui/AlertComponent';
import { alertTypeEnum } from '../../helpers/enums/alertEnum';
import { CreatedTask, CreateTaskType } from '../../types/task';
import { AxiosError } from 'axios';
import http from '../../api/http';
import { UserLocal } from '../../types/user';
import { taskStatusEnum } from '../../helpers/enums/task';
import { errorStatusEnum } from '../../helpers/enums/errorStatusEnum';
import Dialog from '../ui/Dialog';
import DialogDelete from '../ui/DialogDelete';
import * as style from './style/AddNewTaskStyle';
import LoadingSpinner from '../ui/loadingSpinner';
import PageSpinner from '../ui/PageSpinner';
import NewTaskBoxLogged from './NewTaskBoxLogged';
import { useNavigate } from 'react-router-dom';

function addNewTask() {
  const [tasksList, setTasksList] = useState<CreateTaskType[] | []>([]);
  const [tasksListLogged, setTasksListLogged] = useState<CreatedTask[] | []>(
    []
  );
  const [task, setTask] = useState('');
  const [createdTask, setCreatedTask] = useState(0);
  const [alertOfLimite, setAlertOfLimite] = useState<boolean>(false);
  const [user, setUser] = useState<UserLocal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<CreatedTask | null>(null);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<CreatedTask | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<boolean>(false);
  const [editTaskLoading, setEditTaskLoading] = useState<boolean>(false);
  const [deleteTaskLoading, setDeleteTaskLoading] = useState<boolean>(false);
  const [addNewTaskLoading, setAddNewTaskLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [completeTaskDialog, setCompleteTaskDialog] = useState<boolean>(false);

  function handleEditTask(task: CreatedTask) {
    setTaskToEdit(task);
    setEditDialog(true);
  }

  function handleDeleteTask(task: CreatedTask) {
    setTaskToDelete(task);
    setDeleteDialog(true);
  }

  async function handleSubmitEditTask({
    completeTask,
  }: {
    completeTask: boolean;
  }) {
    setEditTaskLoading(true);

    try {
      if (!taskToEdit || !taskToEdit.value) return;
      const { userId, value, status, id } = taskToEdit;

      let payload = {
        userId,
        value,
        status: completeTask ? taskStatusEnum.COMPLETED : status,
        id,
      };

      const { data } = await http.put('/task', payload);

      if (completeTask) {
        setCompleteTaskDialog(false);
      } else {
        setEditDialog(false);
      }

      setTaskToEdit(null);
      await getTask({ status: status, userId: userId });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
      }
    }

    setEditTaskLoading(false);
  }

  async function handleSubmitDeleteTask() {
    setDeleteTaskLoading(true);

    try {
      if (!taskToDelete || !taskToDelete.id) return;
      const { userId, status, id } = taskToDelete;

      const { data } = await http.delete(`/task/${id}/${userId}`);

      setDeleteDialog(false);
      await getTask({ status: status, userId: userId });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
      }
    }

    setDeleteTaskLoading(false);
  }

  // method that add the task in the array of tasks
  async function handleNewTask(event: FormEvent) {
    event.preventDefault();
    setAlertOfLimite(false);

    if (task) {
      // quando o usuário estiver deslogado
      if (!userLogged) {
        setTasksListLogged([]);
        // quando não está logado, só pode adicionar 2 tasks
        if (tasksList.length === 2) {
          toast.warning(
            'O limite máximo de task para um usuário deslogado é 2'
          );
          return;
        }

        let payload = {
          userId: null,
          value: task,
          status: 0,
        };

        setTasksList([...tasksList, payload]);
        setTask('');
      } else {
        setTasksList([]);
        if (tasksList.length === 5) {
          setAlertOfLimite(true);
          return;
        }

        await addNewTask();
      }
    }
  }

  async function getTask({
    status,
    userId,
  }: {
    status: number;
    userId: string | null;
  }) {
    setLoading(true);

    try {
      const { data } = await http.get(
        `task/${userId ? userId : '0'}?status=${status}`
      );

      setTasksListLogged(data.content);
      setUserLogged(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (status === errorStatusEnum.UNAUTHORIZED) {
            setTasksList([]);
            setUserLogged(false);
          }
        }
      }
    }

    setLoading(false);
  }

  async function addNewTask() {
    if (!user) return;
    setAddNewTaskLoading(true);
    setAlertOfLimite(false);

    let payload: CreateTaskType = {
      value: task,
      userId: user?.id,
      status: taskStatusEnum.PENDING,
    };

    try {
      const { data } = await http.post('/task', payload);
      setTask('');
      await getTask({ status: taskStatusEnum.PENDING, userId: user.id });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        let status: number;

        if (err.response) {
          status = err.response.status;

          if (status === errorStatusEnum.BAD_REQUEST) {
            if (err.response.data.message === 'max_limit_five_tasks') {
              setAlertOfLimite(true);
            }
          }
        }
      }
    }
    setAddNewTaskLoading(false);
  }

  async function handleChangeStatus(status: number) {
    if (!user) return;

    await getTask({ status, userId: user.id });
  }

  useEffect(() => {
    const userLocal = localStorage.getItem('user');

    if (userLocal) {
      const parsedUser = JSON.parse(userLocal);

      setUser(parsedUser);

      getTask({ status: taskStatusEnum.PENDING, userId: parsedUser.id });
    }
  }, []);

  return (
    <div>
      <style.AddNewTaskContainer>
        <style.FormTask onSubmit={handleNewTask}>
          <style.FormTaskInputText
            data-test="AddNewTask:InputCreateTask"
            placeholder="Adicione uma nova tarefa"
            type="text"
            required
            name="tasksList"
            id="tasksList"
            onChange={({ target }) => setTask(target.value)}
            value={task}
            border={true}
          />

          <style.FormTaskButtonSubmit
            loading={addNewTaskLoading}
            disabled={addNewTaskLoading}
            data-test="AddNewTask:ButtonCreateTask"
          >
            {!addNewTaskLoading && (
              <>
                Criar
                <style.BorderIconAdd>
                  <Plus color="#f2f2f2" width={12} height={12} />
                </style.BorderIconAdd>
              </>
            )}
            {addNewTaskLoading && <LoadingSpinner size="sm" />}
          </style.FormTaskButtonSubmit>
        </style.FormTask>

        <div>
          {alertOfLimite && (
            <style.TaskMaxAlertLogged>
              <AlertComponent
                onClose={() => setAlertOfLimite(false)}
                size="md"
                type={alertTypeEnum.WARNING}
                message="Você pode ter 5 tarefas com status de pendente, finalize a tarefa para adicionar outras"
              />
            </style.TaskMaxAlertLogged>
          )}
        </div>

        {!userLogged && (
          <NewTaskHeader
            createdTaskCount={tasksList.length}
            onChangeStatus={() => console.log('desabilitar')}
          />
        )}
        {userLogged && !addNewTaskLoading && (
          <NewTaskHeader
            createdTaskCount={tasksListLogged.length}
            onChangeStatus={async (status) => await handleChangeStatus(status)}
          />
        )}

        {!loading &&
          ((userLogged && tasksListLogged.length === 0) ||
            (!userLogged && tasksList.length === 0)) && (
            <style.NotHaveTaskBox>
              <style.NotHaveTaskImgBox>
                <img src={NotHaveTaskImg} />
              </style.NotHaveTaskImgBox>
              <style.NotHaveTaskContent>
                <style.NotHaveTaskText isBold={true}>
                  Você ainda não tem tarefas cadastradas
                </style.NotHaveTaskText>
                <style.NotHaveTaskText isBold={false}>
                  Crie tarefas e organize seus itens a fazer
                </style.NotHaveTaskText>
              </style.NotHaveTaskContent>
            </style.NotHaveTaskBox>
          )}

        {loading && <PageSpinner />}

        {!loading && (
          <style.TasksCardsContainer>
            {!userLogged &&
              tasksList.length > 0 &&
              tasksList.map((task, index: number) => {
                return <NewTaskBox task={task} key={index} />;
              })}
            {userLogged &&
              tasksListLogged.length > 0 &&
              tasksListLogged.map((task, index: number) => {
                return (
                  <NewTaskBoxLogged
                    task={task}
                    key={index}
                    handleEditTask={(e) => handleEditTask(e)}
                    handleDeleteTask={(e) => handleDeleteTask(e)}
                    handleCompleteTask={(e) => {
                      setCompleteTaskDialog(true);
                      setTaskToEdit(e);
                    }}
                  />
                );
              })}
            <div>
              {tasksList.length > 0 && !userLogged && !loading && (
                <AlertComponent
                  type={alertTypeEnum.WARNING}
                  message="Faça o login/registro em nossa plataforma, para não perder seu progresso."
                  size="md"
                />
              )}
            </div>

            {!userLogged && tasksList.length > 0 && (
              <style.LoginCallback onClick={() => navigate('/auth')}>
                <div>
                  <span>Entrar / Criar conta</span>
                </div>
              </style.LoginCallback>
            )}
          </style.TasksCardsContainer>
        )}
      </style.AddNewTaskContainer>

      {/* dialogs */}
      {editDialog && taskToEdit && (
        <Dialog
          isVisible={editDialog}
          loading={editTaskLoading}
          onClose={() => setEditDialog(false)}
          onAction={() => handleSubmitEditTask({ completeTask: false })}
          title="Editar"
          buttonEnDialog={{
            buttonActionText: 'Editar tarefa',
            buttonCloseText: 'Cancelar',
          }}
        >
          <style.Label>Tarefa:</style.Label>

          <style.FormTaskInputText
            type="text"
            value={taskToEdit.value}
            onChange={(e) => {
              let payload: CreatedTask = { ...taskToEdit };
              payload.value = e.target.value;
              setTaskToEdit(payload);
            }}
          />
        </Dialog>
      )}

      {deleteDialog && taskToDelete && (
        <DialogDelete
          isVisible={deleteDialog}
          loading={deleteTaskLoading}
          text="Você tem certeza que deseja deletar está tarefa?"
          onAction={() => handleSubmitDeleteTask()}
          onClose={() => setDeleteDialog(false)}
        />
      )}

      {completeTaskDialog && taskToEdit && (
        <Dialog
          isVisible={completeTaskDialog}
          loading={editTaskLoading}
          onClose={() => {
            setCompleteTaskDialog(false);
            setTaskToEdit(null);
          }}
          onAction={() => {
            handleSubmitEditTask({ completeTask: true });
          }}
          title="Finalizar"
          buttonEnDialog={{
            buttonActionText: 'Sim, finalizar',
            buttonCloseText: 'Não, cancelar',
          }}
        >
          <style.TextConfirmCompleteTask>
            <div>
              <p>
                Tem certeza que deseja finalizar essa tarefa? após mudar o
                status você não vai conseguir alterar ele.
              </p>
            </div>
          </style.TextConfirmCompleteTask>
        </Dialog>
      )}
    </div>
  );
}

export default addNewTask;

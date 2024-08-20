export type CreateTaskType = {
  userId: string | null;
  value: string;
  status: number;
};

export type CreatedTask = {
  id: string;
  userId: string;
  value: string;
  status: number;
  createdAt: string;
  createdBy: string;
  updateAt: string;
  updateBy: string;
};

export type TaskStatusEnumType = {
  PENDING: 1;
  COMPLETED: 2;
};

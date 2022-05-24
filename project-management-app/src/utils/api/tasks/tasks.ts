import API from '../base';

export const Task = {
  getAll: (token: string, boardId: string, columnId: string) =>
    API.get(`boards/${boardId}/columns/${columnId}/tasks`, token),
  getById: (token: string, boardId: string, columnId: string, taskId: string) =>
    API.get(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, token),
  create: (
    token: string,
    boardId: string,
    columnId: string,
    taskData: { title: string; description: string; userId: string }
  ) => API.post(`boards/${boardId}/columns/${columnId}/tasks`, taskData, token),
  update: (
    token: string,
    boardId: string,
    columnId: string,
    taskId: string,
    taskData: {
      title: string;
      order: number;
      description: string;
      userId: string;
      boardId: string;
      columnId: string;
    }
  ) => API.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, taskData, token),
  delete: (token: string, boardId: string, columnId: string, taskId: string) =>
    API.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, token),
};

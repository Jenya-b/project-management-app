import API from '../base';

export const Column = {
  getAll: (token: string, boardId: string) => API.get(`boards/${boardId}/columns`, token),
  getById: (token: string, boardId: string, columnId: string) =>
    API.get(`boards/${boardId}/columns/${columnId}`, token),
  create: (token: string, boardId: string, columnData: { title: string }) =>
    API.post(`boards/${boardId}/columns`, columnData, token),
  update: (
    token: string,
    boardId: string,
    columnId: string,
    columnData: { title: string; order: number }
  ) => API.put(`boards/${boardId}/columns/${columnId}`, columnData, token),
  delete: (token: string, boardId: string, columnId: string) =>
    API.delete(`boards/${boardId}/columns/${columnId}`, token),
};

export const Board = {
  getById: (token: string, boardId: string) => API.get(`boards/${boardId}`, token),
};

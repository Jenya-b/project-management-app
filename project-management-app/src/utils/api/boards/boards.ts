import API from '../base';

interface ProjectRequest {
  title: string;
  description: string;
}

export const Boards = {
  createBoard: (title: ProjectRequest, token: string) =>
    API.post<ProjectRequest>('boards', title, token),
  getBoards: (token: string) => API.get('boards', token),
  getBoardById: (id: string, token: string) => API.getBoardById('boards', id, token),
  delete: (id: string, token: string) => API.delete('boards', token),
};

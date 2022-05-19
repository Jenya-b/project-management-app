import API from '../base';

interface ProjectRequest {
  title: string;
}

export const Boards = {
  createBoard: (title: ProjectRequest, token: string) =>
    API.post<ProjectRequest>('boards', title, token),
};

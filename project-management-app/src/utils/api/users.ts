import API from './base';

export interface UserData {
  id: string;
  name: string;
  login: string;
}

export const Users = {
  getAll: (token: string) => API.get<UserData[]>('users', token),
};

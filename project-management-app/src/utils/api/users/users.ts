import API from '../base';

export const Users = {
  getAll: (token: string) => API.get('users', token),
};

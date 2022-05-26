import API from '../base';
import { UpdateUserRequest } from './usersTypes';

export const Users = {
  getAll: (token: string) => API.get('users', token),
  updateUser: (token: string, userId: string, userData: UpdateUserRequest) => {
    return API.put<UpdateUserRequest>(`users/${userId}`, userData, token);
  },
};

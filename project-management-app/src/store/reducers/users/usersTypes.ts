import { UserData } from '../../../utils/api/users/usersTypes';

export interface UsersState {
  users: UserData[];
  loading: boolean;
  error: string;
}

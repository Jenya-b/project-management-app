import { UserData } from '../../../utils/api/users/usersTypes';

export interface LoginState {
  token: string;
  loading: boolean;
  newUser: UserData;
  errors: string[];
}

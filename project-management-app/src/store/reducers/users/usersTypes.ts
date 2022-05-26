import { UserData } from '../../../utils/api/users/usersTypes';
import { UpdateUserRequest } from '../../../utils/api/users/usersTypes';

export interface UsersState {
  users: UserData[];
  loading: boolean;
  errors: string[];
  currentUser: UserData;
}

export interface UserUpdateThunkProperties {
  id: string;
  userData: UpdateUserRequest;
}

export interface UserData {
  id: string;
  name: string;
  login: string;
}

export interface UpdateUserRequest {
  name: string;
  login: string;
  password: string;
}

export interface UpdateUserResponse {
  id: string;
  login: string;
  name: string;
}

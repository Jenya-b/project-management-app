export interface SigninRequest {
  login: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

export interface SignupRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  login: string;
  name: string;
}

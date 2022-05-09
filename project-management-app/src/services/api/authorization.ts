import API, { ResponseError } from './base';

interface SigninRequest {
  login: string;
  password: string;
}

interface SigninResponse {
  token: string;
  error?: ResponseError;
}

interface SignupRequest {
  name: string;
  login: string;
  password: string;
}

interface SignupResponse {
  id: string;
  login: string;
  name: string;
  error?: ResponseError;
}

export const Authorization = {
  signin: (user: SigninRequest) => API.post<SigninRequest, SigninResponse>('signin', user, ''),
  signup: (user: SignupRequest) => API.post<SignupRequest, SignupResponse>('signup', user, ''),
};

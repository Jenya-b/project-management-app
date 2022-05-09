import API from './base';

interface SigninRequest {
  login: string;
  password: string;
}

interface SigninResponse {
  token: string;
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
}

export const Authorization = {
  signin: (user: SigninRequest) => API.post<SigninRequest, SigninResponse>('signin', user, ''),
  signup: (user: SignupRequest) => API.post<SignupRequest, SignupResponse>('signup', user, ''),
};

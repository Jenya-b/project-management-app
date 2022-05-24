import API from './base';
import { SigninRequest, SignupRequest } from './authorizationTypes';

export const Authorization = {
  signin: (user: SigninRequest) => API.post<SigninRequest>('signin', user, ''),
  signup: (user: SignupRequest) => API.post<SignupRequest>('signup', user, ''),
};

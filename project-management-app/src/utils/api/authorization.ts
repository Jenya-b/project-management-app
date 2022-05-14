import API from './base';
import { SigninRequest, SigninResponse, SignupRequest, SignupResponse } from './authorizationTypes';

export const Authorization = {
  signin: (user: SigninRequest) => API.post<SigninRequest, SigninResponse>('signin', user, ''),
  signup: (user: SignupRequest) => API.post<SignupRequest, SignupResponse>('signup', user, ''),
};

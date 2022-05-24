import { createAsyncThunk } from '@reduxjs/toolkit';
import { Authorization } from '../../../utils/api/authorization/authorization';
import { RootState, AppDispatch } from '../../store';
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
} from '../../../utils/api/authorization/authorizationTypes';
import { ResponseError } from '../../../utils/api/responseError';

export const signup = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('login/signup', async (userData, thunkApi) => {
  const response = await Authorization.signup(userData);
  if (!response.ok) {
    const errorDetails: ResponseError = await response.json();
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await response.json();
  return content;
});

export const signin = createAsyncThunk<
  SigninResponse,
  SigninRequest,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('login/signip', async (userData, thunkApi) => {
  const response = await Authorization.signin(userData);
  if (!response.ok) {
    const errorDetails: ResponseError = await response.json();
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await response.json();
  return content;
});

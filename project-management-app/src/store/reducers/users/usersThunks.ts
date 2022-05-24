import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../utils/api/users/usersTypes';
import { RootState, AppDispatch } from '../../store';
import { ResponseError } from '../../../utils/api/responseError';
import { Users } from '../../../utils/api/users/users';
import { logout } from '../login/loginSlice';

export const fetchUsers = createAsyncThunk<
  UserData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('users/fetchAll', async (requestData, thunkApi) => {
  const token = thunkApi.getState().loginReducer.token;
  const response = await Users.getAll(token);
  if (!response.ok) {
    const errorDetails: ResponseError = await response.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await response.json();
  return content;
});

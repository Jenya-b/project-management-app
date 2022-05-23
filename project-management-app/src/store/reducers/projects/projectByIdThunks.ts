import { createAsyncThunk } from '@reduxjs/toolkit';
import { Boards } from '../../../utils/api/boards/boards';
import { ResponseError } from '../../../utils/api/responseError';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../login/loginSlice';
import { ProjectsData } from './projectsType';
import { ProjectByIdRequest } from './projectsType';

export const fetchProjectById = createAsyncThunk<
  ProjectsData,
  ProjectByIdRequest,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('project/fetchAll', async ({ id }, thunkApi) => {
  const token = localStorage.getItem('user_token');
  const response = await Boards.getBoardById(id, token ?? '');
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

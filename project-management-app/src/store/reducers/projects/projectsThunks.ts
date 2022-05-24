import { createAsyncThunk } from '@reduxjs/toolkit';
import { Boards } from '../../../utils/api/boards/boards';
import { ResponseError } from '../../../utils/api/responseError';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../login/loginSlice';
import { ProjectsData } from './projectsType';

export const fetchProjects = createAsyncThunk<
  ProjectsData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('projects/fetchAll', async (requestData, thunkApi) => {
  const token = thunkApi.getState().loginReducer.token;
  const response = await Boards.getBoards(token ?? '');
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

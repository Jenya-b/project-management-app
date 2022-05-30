import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../utils/settings';
import { Task } from '../../../utils/api/tasks/tasks';
import { Column, Board } from '../../../utils/api/columns/columns';
import { RootState, AppDispatch } from '../../store';
import { ResponseError } from '../../../utils/api/responseError';
import { logout } from '../login/loginSlice';
import { ColumnType, TaskType, BoardType } from '../../../modules/types';
import { DropResult } from 'react-beautiful-dnd';

export const getBoard = createAsyncThunk<
  BoardType,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/getBoard', async function (_, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Board.getById(token, projectId);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async function (params: { token: string; boardData: { title: string } }, thunkApi) {
    try {
      const res = await fetch(`${API_URL}/boards`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
        body: JSON.stringify(params.boardData),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      return thunkApi.rejectWithValue(res.statusText);
    } catch (err) {
      thunkApi.rejectWithValue(err);
    }
  }
);

export const getColumns = createAsyncThunk<
  ColumnType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/getColumns', async function (_, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Column.getAll(token, projectId);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const getTasks = createAsyncThunk<
  TaskType[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/getTasks', async function (columnId, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Task.getAll(token, projectId, columnId);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const createColumn = createAsyncThunk<
  ColumnType,
  { title: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/createColumn', async function (columnData, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Column.create(token, projectId, columnData);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const createTask = createAsyncThunk<
  TaskType,
  {
    columnId: string;
    taskData: { title: string; description: string; userId: string };
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/createTask', async function ({ columnId, taskData }, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Task.create(token, projectId, columnId, taskData);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const updateColumn = createAsyncThunk<
  ColumnType,
  {
    columnId: string;
    columnData: { title: string; order: number };
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/updateColumn', async function ({ columnId, columnData }, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Column.update(token, projectId, columnId, columnData);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const updateTask = createAsyncThunk<
  TaskType,
  {
    columnId: string;
    taskId: string;
    taskData: {
      title: string;
      order: number;
      description: string;
      userId: string;
      boardId: string;
      columnId: string;
    };
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/updateTask', async function ({ columnId, taskId, taskData }, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Task.update(token, projectId, columnId, taskId, taskData);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  const content = await res.json();
  return content;
});

export const deleteColumn = createAsyncThunk<
  { columnId: string; order: number },
  { columnId: string; order: number },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError | string;
  }
>('board/deleteColumn', async function ({ columnId, order }, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Column.delete(token, projectId, columnId);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  return { columnId, order };
});

export const deleteTask = createAsyncThunk<
  { columnId: string; taskId: string; order: number },
  { columnId: string; taskId: string; order: number },
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError | string;
  }
>('board/deleteTask', async function ({ columnId, taskId, order }, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const res = await Task.delete(token, projectId, columnId, taskId);
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  return { columnId, taskId, order };
});

export const updateTaskOrder = createAsyncThunk<
  DropResult,
  DropResult,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/updateTaskOrder', async function (position, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const boardId = thunkApi.getState().projectByIdReducer.projectId;
  const board = thunkApi.getState().boardReducer.board;
  const taskId = position.draggableId;
  const columnId = position.destination?.droppableId || '';
  const prevColumnId = position.source.droppableId;
  const column = board.columns.find((item) => item.id === columnId);
  if (column) {
    const task = column.tasks.find((item) => item.id === taskId);
    const order = position.destination?.index || 0;
    const res = await Task.update(token, boardId, prevColumnId, taskId, {
      title: task?.title || '',
      order: order + 1,
      description: JSON.stringify(task?.description),
      userId: task?.userId || '',
      boardId,
      columnId,
    });
    if (!res.ok) {
      const errorDetails: ResponseError = await res.json();
      if (errorDetails.statusCode === 401) {
        thunkApi.dispatch(logout());
      }
      return thunkApi.rejectWithValue(errorDetails);
    }
  }
  return position;
});

export const updateColumnOrder = createAsyncThunk<
  DropResult,
  DropResult,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: ResponseError;
  }
>('board/updateColumnOrder', async function (position, thunkApi) {
  const token = thunkApi.getState().loginReducer.token;
  const projectId = thunkApi.getState().projectByIdReducer.projectId;
  const board = thunkApi.getState().boardReducer.board;
  const columnId = position.draggableId;
  const column = board.columns.find((item) => item.id === columnId);
  const title = column?.title || '';
  const order = position.destination?.index || 0;
  const res = await Column.update(token, projectId, columnId, {
    title,
    order: order + 1,
  });
  if (!res.ok) {
    const errorDetails: ResponseError = await res.json();
    if (errorDetails.statusCode === 401) {
      thunkApi.dispatch(logout());
    }
    return thunkApi.rejectWithValue(errorDetails);
  }
  return position;
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import confirmationDialog from './reducers/confirmationDialogSlice';
import langInterfaceReducer from './reducers/langInterfaceSlice';
import boardReducer from './reducers/board/boardSlice';
import loginReducer from './reducers/login/loginSlice';
import usersReducer from './reducers/users/usersSlice';
import projectsReducer from './reducers/projects/projectsSlice';
import projectByIdReducer from './reducers/projects/projectByIdSlice';

export const rootReducer = combineReducers({
  confirmationDialog,
  langInterfaceReducer,
  boardReducer,
  loginReducer,
  usersReducer,
  projectsReducer,
  projectByIdReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

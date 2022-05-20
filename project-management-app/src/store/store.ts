import { combineReducers, configureStore } from '@reduxjs/toolkit';
import confirmationDialog from './reducers/confirmationDialogSlice';
import langInterfaceReducer from './reducers/langInterfaceSlice';
import loginReducer from './reducers/login/loginSlice';
import usersReducer from './reducers/users/usersSlice';
import projectsReducer from './reducers/projects/projectsSlice';

export const rootReducer = combineReducers({
  confirmationDialog,
  langInterfaceReducer,
  loginReducer,
  usersReducer,
  projectsReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

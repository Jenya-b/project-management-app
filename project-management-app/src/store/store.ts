import { combineReducers, configureStore } from '@reduxjs/toolkit';
import confirmationDialog from './reducers/confirmationDialogSlice';
import langInterfaceReducer from './reducers/langInterfaceSlice';
import boardReducer from './reducers/board/boardSlice';
import loginReducer from './reducers/login/loginSlice';

export const rootReducer = combineReducers({
  confirmationDialog,
  langInterfaceReducer,
  boardReducer,
  loginReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

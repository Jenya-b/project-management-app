import { combineReducers, configureStore } from '@reduxjs/toolkit';
import confirmationDialog from './reducers/confirmationDialogSlice';
import langInterfaceReducer from './reducers/langInterfaceSlice';

export const rootReducer = combineReducers({
  confirmationDialog,
  langInterfaceReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

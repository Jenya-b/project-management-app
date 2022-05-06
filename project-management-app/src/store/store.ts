import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalWindowReducer from './reducers/modalWindowSlice';
import langInterfaceReducer from './reducers/langInterfaceSlice';

export const rootReducer = combineReducers({
  modalWindowReducer,
  langInterfaceReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

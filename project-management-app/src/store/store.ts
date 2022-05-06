import { combineReducers, configureStore } from '@reduxjs/toolkit';
import modalWindowReducer from './reducers/modalWindowSlice';

export const rootReducer = combineReducers({
  modalWindowReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });

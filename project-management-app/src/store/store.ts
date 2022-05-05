import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({});

export const setupStore = () => configureStore({ reducer: rootReducer });

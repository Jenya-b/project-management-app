import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from './loginTypes';

export const USER_DATA_KEY = 'project_management_app_user_data';
export const TOKEN_KEY = 'project_management_app_token';

const initialState: LoginState = {
  token: '',
  loading: false,
  user: {
    id: '',
    name: '',
    login: '',
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state) {
      const userDataJson = localStorage.getItem(USER_DATA_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      if (userDataJson) {
        const userData = JSON.parse(userDataJson);
        const { id, name, login } = userData;
        state.user = { id, name, login };
      }
      if (token) {
        state.token = token;
      }
    },
    logout(state) {
      state.token = '';
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

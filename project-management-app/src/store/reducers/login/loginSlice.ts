import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from './loginTypes';
import { signup, signin } from './loginThunks';
import { StatusCodes } from '../../../utils/api/responseError';
import { makeArray } from '../../../utils/makeArray';

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
  errors: [],
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
    clearErrors(state) {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(action.payload));
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { statusCode, message } = action.payload;
        switch (statusCode) {
          case StatusCodes.BAD_REQUEST:
            state.errors = makeArray(message);
            break;
        }
      } else {
        console.error(action.error);
      }
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.errors = [];
      localStorage.setItem(TOKEN_KEY, action.payload.token);
    });
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const { statusCode, message } = action.payload;
        switch (statusCode) {
          case StatusCodes.BAD_REQUEST:
            state.errors = makeArray(message);
            break;
        }
      } else {
        state.errors = ['Unknown error'];
        console.error(action.error);
      }
    });
  },
});

export const { login, logout, clearErrors } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from './loginTypes';
import { signup, signin } from './loginThunks';
import { makeArray } from '../../../utils/makeArray';

const initialState: LoginState = {
  token: '',
  loading: false,
  errors: [],
  newUser: {
    id: '',
    name: '',
    login: '',
  },
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload) {
        state.token = action.payload;
      }
    },
    logout(state) {
      state.token = '';
    },
    clearErrors(state) {
      state.errors = [];
    },
    clearUserCreated(state) {
      state.newUser = {
        id: '',
        name: '',
        login: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.newUser = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errors = makeArray(action.payload.message);
      } else {
        console.error(action.error);
      }
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errors = makeArray(action.payload.message);
      } else {
        state.errors = ['Unknown error'];
        console.error(action.error);
      }
    });
  },
});

export const { login, logout, clearErrors, clearUserCreated } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from './usersTypes';
import { fetchUsers, updateUser } from './usersThunks';
import { makeArray } from '../../../utils/makeArray';

const initialState: UsersState = {
  users: [],
  loading: false,
  errors: [],
  currentUser: {
    id: '',
    name: '',
    login: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.error(action.payload.message);
        switch (action.payload.statusCode) {
          case 401:
            state.errors = ['Your session has expired!'];
            break;
          default:
            state.errors = ['Wrong request'];
        }
      } else {
        state.errors = ['No answer from server. Please, try again later'];
        console.error(action.error);
      }
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errors = [];
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errors = makeArray(action.payload.message);
      } else {
        console.error(action.error);
      }
    });
  },
});

export const { setCurrentUser, clearErrors } = usersSlice.actions;
export default usersSlice.reducer;

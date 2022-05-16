import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from './usersTypes';
import { fetchUsers } from './usersThunks';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
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
            state.error = 'Your session has expired!';
            break;
          default:
            state.error = 'Wrong request';
        }
      } else {
        state.error = 'No answer from server. Please, try again later';
        console.error(action.error);
      }
    });
  },
});

export default usersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects } from './projectsThunks';

export type ProjectsData = {
  title: string;
  id: string;
};

export type ProjectsSliceType = {
  projects: ProjectsData[];
  loading: boolean;
  error: string;
};

const initialState: ProjectsSliceType = {
  projects: [],
  loading: false,
  error: '',
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
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

export default projectsSlice.reducer;

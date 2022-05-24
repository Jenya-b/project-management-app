import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects } from './projectsThunks';
import { ProjectsData } from './projectsType';

export type ProjectsSliceType = {
  projects: ProjectsData[];
  isLoading: boolean;
  error: string;
};

const initialState: ProjectsSliceType = {
  projects: [],
  isLoading: false,
  error: '',
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
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

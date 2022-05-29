import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects, createProject } from './projectsThunks';
import { ProjectsData } from './projectsType';
import { makeArray } from '../../../utils/makeArray';

export type ProjectsSliceType = {
  projects: ProjectsData[];
  isLoading: boolean;
  error: string;
  newProjectCreated: boolean;
  newProjectCreating: boolean;
  newProjectErrors: string[];
};

const initialState: ProjectsSliceType = {
  projects: [],
  isLoading: false,
  error: '',
  newProjectCreated: false,
  newProjectCreating: false,
  newProjectErrors: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjectCreated(state) {
      state.newProjectCreated = false;
      state.newProjectErrors = [];
    },
    clearNewProjectErrors(state) {
      state.newProjectErrors = [];
    },
  },
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
    builder.addCase(createProject.fulfilled, (state) => {
      state.newProjectCreated = true;
      state.newProjectCreating = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.newProjectCreating = true;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.newProjectCreating = false;
      if (action.payload) {
        const { message, statusCode } = action.payload;
        switch (statusCode) {
          case 401:
            state.newProjectErrors = ['Your session has expired!'];
            break;
          default:
            state.newProjectErrors = makeArray(message);
        }
      } else {
        state.newProjectErrors = ['No answer from server. Please, try again later'];
        console.error(action.error);
      }
    });
  },
});

export default projectsSlice.reducer;

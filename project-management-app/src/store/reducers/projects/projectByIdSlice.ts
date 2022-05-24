import { createSlice } from '@reduxjs/toolkit';
import { fetchProjectById } from './projectByIdThunks';
import { ProjectsData } from './projectsType';

type ProjectSliceType = {
  project: ProjectsData;
  isLoading: boolean;
  error: string;
  projectId: string;
};

const initialState: ProjectSliceType = {
  project: {
    title: '',
    id: '',
  },
  isLoading: false,
  error: '',
  projectId: '',
};

export const projectByIdSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectId(state, action) {
      state.projectId = action.payload;
    },
    setProject(state, action) {
      state.project = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.project = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProjectById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
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

export default projectByIdSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isModalActive: false,
};

export const confirmationDialogSlice = createSlice({
  name: 'confirmationDialog',
  initialState,
  reducers: {
    setDialogActivity(state, action: PayloadAction<boolean>) {
      state.isModalActive = action.payload;
    },
  },
});

export default confirmationDialogSlice.reducer;

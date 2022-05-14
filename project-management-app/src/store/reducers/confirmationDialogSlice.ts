import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isDialogActive: false,
  infoDialog: '',
};

export const confirmationDialogSlice = createSlice({
  name: 'confirmationDialog',
  initialState,
  reducers: {
    setDialogActivity(state, action: PayloadAction<boolean>) {
      state.isDialogActive = action.payload;
    },
    setInfoDialog(state, action: PayloadAction<string>) {
      state.infoDialog = action.payload;
    },
  },
});

export default confirmationDialogSlice.reducer;

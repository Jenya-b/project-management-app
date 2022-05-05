import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isModalWindowActive: false,
};

export const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    setModalWindowActivity(state, action: PayloadAction<boolean>) {
      state.isModalWindowActive = action.payload;
    },
  },
});

export default modalWindowSlice.reducer;

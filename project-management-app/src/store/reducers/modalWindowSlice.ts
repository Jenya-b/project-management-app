import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isModalWindowActive: false,
  infoModal: '',
};

export const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    setModalWindowActivity(state, action: PayloadAction<boolean>) {
      state.isModalWindowActive = action.payload;
    },
    setInfoModal(state, action: PayloadAction<string>) {
      state.infoModal = action.payload;
    },
  },
});

export default modalWindowSlice.reducer;

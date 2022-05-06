import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultLanguage } from '../../modules/constants/constUtils';

const initialState = {
  language: defaultLanguage,
};

export const langInterfaceSlice = createSlice({
  name: 'languageInterface',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export default langInterfaceSlice.reducer;

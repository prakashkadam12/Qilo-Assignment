import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = listSlice.actions;
export default listSlice.reducer;

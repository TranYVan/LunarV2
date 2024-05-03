import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: ''
};

export const productsSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct } = productsSlide.actions;

export default productsSlide.reducer;

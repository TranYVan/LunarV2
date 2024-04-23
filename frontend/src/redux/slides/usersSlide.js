import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  access_token: "",

};

export const usersSlide = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, fullName, email, birthday, phone, token } = action.payload;
      console.log("action: ", action);
      state.name = fullName || email;
      state.email = email;
      state.access_token = token;
    },
    resetUser: (state) => {
      state.name = '',
      state.email = '',
      state.access_token = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = usersSlide.actions;

export default usersSlide.reducer;

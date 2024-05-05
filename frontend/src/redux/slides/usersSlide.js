import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  avatar: "",
  access_token: "",
  roles: []
};

export const usersSlide = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, fullName, email, birthday, phone, address, avatar, token, roles } = action.payload;
      state.id = id;
      state.name = fullName;
      state.email = email;
      state.phone = phone;
      state.address = address
      state.birthday = birthday;
      state.avatar = avatar;
      state.access_token = token;
      state.roles = roles;
      
    },
    resetUser: (state) => {
      state.name = '',
      state.email = '',
      state.access_token = '';
      state.id = '';
      state.phone = '';
      state.address = '';
      state.birthday = '';
      state.avatar = '';
      state.roles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = usersSlide.actions;

export default usersSlide.reducer;

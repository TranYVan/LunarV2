import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/usersSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/usersSlide";
import productReducer from "./slides/productsSlide";
import orderReducer from "./slides/orderSlide";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { blacklist } from "validator";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['product', 'user']
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import fontStylesReducer from "./slices/fontStylesSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    fontStyles: fontStylesReducer,
  },
});

export default store;

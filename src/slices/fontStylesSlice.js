import { createSlice } from "@reduxjs/toolkit";
import { defaultTheme } from "../themeConfig";

const loadFontStylesFromLocalStorage = () => {
  const savedStyles = localStorage.getItem("fontStyles");
  return savedStyles ? JSON.parse(savedStyles) : defaultTheme;
};

const saveFontStylesToLocalStorage = (fontStyles) => {
  localStorage.setItem("fontStyles", JSON.stringify(fontStyles));
};

const fontStylesSlice = createSlice({
  name: "fontStyles",
  initialState: loadFontStylesFromLocalStorage(),
  reducers: {
    setFontStyles: (state, action) => {
      const newStyles = {
        ...defaultTheme,
        ...action.payload,
      };
      saveFontStylesToLocalStorage(newStyles);
      return newStyles;
    },
  },
});

export const { setFontStyles } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { defaultTheme } from "../themeConfig";

// Function to merge API response with default values
const mergeWithDefault = (apiStyles, defaultStyles) => {
  return Object.keys(defaultStyles).reduce((merged, key) => {
    if (typeof defaultStyles[key] === "object" && apiStyles[key]) {
      merged[key] = mergeWithDefault(apiStyles[key], defaultStyles[key]);
    } else {
      merged[key] = apiStyles[key] || defaultStyles[key];
    }
    return merged;
  }, {});
};

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
      const newStyles = mergeWithDefault(action.payload, defaultTheme);
      saveFontStylesToLocalStorage(newStyles);
      return newStyles;
    },
  },
});

export const { setFontStyles } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadFontStylesFromLocalStorage = () => {
  const savedStyles = localStorage.getItem("fontStyles");
  return savedStyles
    ? JSON.parse(savedStyles)
    : { fontSize: "16px", fontFamily: "Arial", color: "black" };
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
        fontSize: action.payload.fontSize || "16px",
        fontFamily: action.payload.fontFamily || "Arial",
        color: action.payload.color || "black",
      };
      saveFontStylesToLocalStorage(newStyles);
      return newStyles;
    },
  },
});

export const { setFontStyles } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;

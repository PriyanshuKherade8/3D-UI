import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFontStyles } from "../slices/fontStylesSlice";

const mockApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fontSize: "17px",
        fontFamily: "Georgia",
        color: "red",
      });
    }, 1000);
  });
};

const useFetchFontStyles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFontStyles = async () => {
      try {
        const response = await mockApiCall();
        dispatch(setFontStyles(response));
      } catch (error) {
        console.error("Failed to fetch font styles:", error);
      }
    };

    fetchFontStyles();
  }, [dispatch]);
};

export default useFetchFontStyles;

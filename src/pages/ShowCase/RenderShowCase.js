import React from "react";
import DesktopMainShowCase from "./Desktop-View/Components/DesktopMainShowCase";
import ShowCaseMain from "./Mobile-View/Components/ShowCaseMain";
import { useMediaQuery } from "@mui/material";

const RenderShowCase = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <ShowCaseMain /> : <DesktopMainShowCase />;
};

export default RenderShowCase;

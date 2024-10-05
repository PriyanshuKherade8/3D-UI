import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileMain from "./Mobile-View/MobileMain";
import Main from "./Desktop-View/Main";

const RenderView = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <MobileMain /> : <Main />;
};

export default RenderView;

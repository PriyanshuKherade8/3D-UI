import React from "react";
import { useMediaQuery } from "@mui/material";
import StoryMain from "./Mobile-View/StoryMain";
import StoryDesktopView from "./Desktop-View/StoryDesktopView";

const RenderStory = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return isMobile ? <StoryMain /> : <StoryDesktopView />;
};

export default RenderStory;

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import styled from "styled-components";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const ControlBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 4px;
  border-radius: 12px;
  //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: auto;
`;

const IconButtonStyled = styled(IconButton)`
  color: #333;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${({ clicked }) => (clicked ? "scale(1.2)" : "scale(1)")};
  opacity: ${({ clicked }) => (clicked ? 0.8 : 1)};
  &:hover {
    transform: scale(1.2); /* Slight scale on hover */
    color: #000; /* Color change on hover */
  }
`;

const MediaControlBar = () => {
  const [clickedIcon, setClickedIcon] = useState(null);

  const handleClick = (icon) => {
    setClickedIcon(icon);
    // Optional: You can add further logic here based on the clicked icon
    setTimeout(() => {
      setClickedIcon(null); // Reset the click effect after animation
    }, 300); // Duration of the effect
  };

  return (
    <ControlBar>
      <IconButtonStyled
        clicked={clickedIcon === "repeat"}
        onClick={() => handleClick("repeat")}
      >
        <RepeatIcon />
      </IconButtonStyled>
      <Box style={{ margin: "0px 14px" }}>
        <IconButtonStyled
          clicked={clickedIcon === "previous"}
          onClick={() => handleClick("previous")}
        >
          <SkipPreviousIcon />
        </IconButtonStyled>
        <IconButtonStyled
          clicked={clickedIcon === "play"}
          onClick={() => handleClick("play")}
        >
          <PlayArrowIcon />
        </IconButtonStyled>
        <IconButtonStyled
          clicked={clickedIcon === "next"}
          onClick={() => handleClick("next")}
        >
          <SkipNextIcon />
        </IconButtonStyled>
      </Box>
      <IconButtonStyled
        clicked={clickedIcon === "volume"}
        onClick={() => handleClick("volume")}
      >
        <VolumeUpIcon />
      </IconButtonStyled>
    </ControlBar>
  );
};

export default MediaControlBar;

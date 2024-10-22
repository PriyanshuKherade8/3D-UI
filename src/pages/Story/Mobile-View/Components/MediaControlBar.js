import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import styled from "styled-components";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

// Styled components
const ControlBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 4px;
  border-radius: 12px;
  width: auto;
  z-index: 1000;
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

const MediaControlBar = ({
  sessionId,
  sendRotateCall,
  chapterList,
  playPause: socketPlayPause,
  playPauseToggle,
}) => {
  const [clickedIcon, setClickedIcon] = useState(null);
  const [replay, setReplay] = useState(false);
  const [playPause, setPlayPause] = useState(true); // Local playPause state

  // Sync initial state with socketPlayPause value
  useEffect(() => {
    if (typeof socketPlayPause === "boolean") {
      setPlayPause(socketPlayPause);
    }
  }, [playPauseToggle]);

  // Variables to determine if PREV and NEXT chapters are available
  const currentChapter = chapterList?.find(
    (chapter) => chapter.chapter_type === "CURR"
  );
  const prevChapter = chapterList?.find(
    (chapter) => chapter.chapter_type === "PREV"
  );
  const nextChapter = chapterList?.find(
    (chapter) => chapter.chapter_type === "NEXT"
  );

  const handleReplay = () => {
    setReplay((prev) => {
      const newReplayValue = !prev;
      const payload = {
        session_id: sessionId,
        message: {
          type: "replay",
          message: newReplayValue,
        },
      };
      sendRotateCall(payload);
      return newReplayValue;
    });
  };

  const handlePlayPause = () => {
    setPlayPause((prev) => {
      const newPlayPauseValue = !prev;
      const payload = {
        session_id: sessionId,
        message: {
          type: "play_pause",
          message: newPlayPauseValue,
        },
      };
      sendRotateCall(payload);
      return newPlayPauseValue;
    });
  };

  const handleClick = (icon) => {
    setClickedIcon(icon);
    setTimeout(() => {
      setClickedIcon(null);
    }, 300);
  };

  const handlePrevious = () => {
    if (prevChapter) {
      const payload = {
        session_id: sessionId,
        message: {
          type: "change_chapter",
          message: { chapter_id: prevChapter.chapter_id },
        },
      };
      sendRotateCall(payload);
    }
  };

  const handleNext = () => {
    if (nextChapter) {
      const payload = {
        session_id: sessionId,
        message: {
          type: "change_chapter",
          message: { chapter_id: nextChapter.chapter_id },
        },
      };
      sendRotateCall(payload);
    }
  };

  return (
    <ControlBar>
      <IconButtonStyled
        clicked={clickedIcon === "repeat"}
        onClick={() => {
          handleClick("repeat");
          handleReplay();
        }}
      >
        <RepeatIcon />
      </IconButtonStyled>

      <Box style={{ margin: "0px 14px" }}>
        <IconButtonStyled
          clicked={clickedIcon === "previous"}
          onClick={() => {
            handleClick("previous");
            handlePrevious();
          }}
          disabled={!prevChapter} // Disable if no previous chapter
        >
          <SkipPreviousIcon />
        </IconButtonStyled>

        <IconButtonStyled
          clicked={clickedIcon === "play"}
          onClick={() => {
            handleClick("play");
            handlePlayPause();
          }}
        >
          {playPause ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButtonStyled>

        <IconButtonStyled
          clicked={clickedIcon === "next"}
          onClick={() => {
            handleClick("next");
            handleNext();
          }}
          disabled={!nextChapter} // Disable if no next chapter
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

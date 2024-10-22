import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import styled from "styled-components";
import { Turn as Hamburger } from "hamburger-react";
import RedoIcon from "@mui/icons-material/Redo";
import RefreshIcon from "@mui/icons-material/Refresh";

const SidebarContainer = styled(Box)`
  position: fixed;
  top: 5%;
  left: 10px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.5s ease-in-out;
  width: ${({ open }) =>
    open ? "48px" : "48px"}; /* Expanded or collapsed width */
  height: ${({ open }) => (open ? "auto" : "48px")}; /* Expands to show icons */
`;

const IconButtonStyled = styled(IconButton)`
  transition: transform 0.3s, opacity 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? "scale(1)" : "scale(0.8)")};
  transition: opacity 0.3s, transform 0.3s;
`;

const HamburgerContainer = styled(Box)`
  z-index: 1100;
`;

const AnimatedMenu = ({
  rotate,
  setRotate,
  sessionId,
  sendRotateCall,
  controlId,
}) => {
  const [open, setOpen] = useState(false);

  const handleRotate = () => {
    setRotate((prev) => {
      const newRotateValue = !prev;

      const payload = {
        session_id: sessionId,
        message: {
          type: "control",
          message: { control_id: controlId, value: newRotateValue.toString() },
        },
      };

      sendRotateCall(payload);

      return newRotateValue;
    });
  };

  return (
    <SidebarContainer open={open}>
      <HamburgerContainer>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={20}
          direction="right"
        />
      </HamburgerContainer>

      {open && (
        <>
          <IconButtonStyled visible={open} onClick={handleRotate}>
            <RedoIcon />
          </IconButtonStyled>
          <IconButtonStyled visible={open}>
            <RefreshIcon />
          </IconButtonStyled>
        </>
      )}
    </SidebarContainer>
  );
};

export default AnimatedMenu;

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import styled from "styled-components";
import { Turn as Hamburger } from "hamburger-react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MenuContainer = styled(Box)`
  position: fixed;
  top: 15%; /* Position of the menu */
  left: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  overflow: hidden;
  height: ${({ open }) => (open ? "200px" : "0")}; /* Height transition */
  opacity: ${({ open }) => (open ? 1 : 0)}; /* Opacity transition */
  transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out; /* Smooth transition */
`;

const IconButtonStyled = styled(IconButton)`
  transition: transform 0.3s, opacity 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? "scale(1)" : "scale(0.8)")};
  transition: opacity 0.3s, transform 0.3s;
`;

const HamburgerContainer = styled(Box)`
  position: fixed;
  top: 5%;
  left: 10px;
  z-index: 1100; /* Ensure it's above the menu */
  padding: 5px;
  background-color: white;
  border-radius: 10px;
`;

const AnimatedMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerContainer>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={20}
          direction="right"
        />
      </HamburgerContainer>

      {/* Menu that opens when toggled */}
      <MenuContainer open={open}>
        <IconButtonStyled visible={open}>
          <SwapHorizIcon />
        </IconButtonStyled>
        <IconButtonStyled visible={open}>
          <RefreshIcon />
        </IconButtonStyled>
        <IconButtonStyled visible={open}>
          <OpenInFullIcon />
        </IconButtonStyled>
        <IconButtonStyled visible={open}>
          <ExpandMoreIcon />
        </IconButtonStyled>
      </MenuContainer>
    </>
  );
};

export default AnimatedMenu;

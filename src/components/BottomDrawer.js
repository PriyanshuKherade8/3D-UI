import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
const DrawerContainer = styled.div`
  position: relative;
  height: 20vh;
  overflow: hidden;
`;

const Drawer = styled.div`
  position: fixed;
  bottom: -200px;
  left: 0;
  right: 0;
  height: 200px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: bottom 0.3s ease;
  z-index: 20;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
    `}
`;

const DrawerContent = styled.div`
  padding: 16px;
`;

const SwipeableArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5vh;
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const BottomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;

    if (isOpen && currentY > startY + 50) {
      setIsOpen(false); // Swiping down
    } else if (!isOpen && currentY < startY - 50) {
      setIsOpen(true); // Swiping up
    }
  };

  return (
    <DrawerContainer>
      {!isOpen && (
        <SwipeableArea
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onClick={toggleDrawer}
        >
          <HorizontalRuleIcon />
        </SwipeableArea>
      )}
      <Drawer
        isOpen={isOpen}
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <DrawerContent>
          <h2>Bottom Drawer Content</h2>
          <p>Your content goes here.</p>
        </DrawerContent>
      </Drawer>
    </DrawerContainer>
  );
};

export default BottomDrawer;

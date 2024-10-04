import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

const DrawerContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden; /* Ensure no scrolling beyond 100vh */
`;

const Drawer = styled.div`
  position: absolute;
  bottom: -300px; /* Adjust based on your drawer height */
  left: 0;
  right: 0;
  height: 300px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: bottom 0.3s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
    `}
`;

const DrawerContent = styled.div`
  padding: 16px;
`;

// The swipeable area (visible when drawer is closed)
const SwipeableArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10vh; /* Visible area when the drawer is closed */
  background: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10; /* Keep above other content */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const BottomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const drawerRef = useRef(null);

  // Disable scroll when the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when the component unmounts or the drawer state changes
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
      // Swiping down
      setIsOpen(false);
    } else if (!isOpen && currentY < startY - 50) {
      // Swiping up
      setIsOpen(true);
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
          <h4>Swipe up to open</h4>
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

import React, { useState, useRef } from "react";
import { Drawer, Box, Typography, Grid } from "@mui/material";
import { styled } from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AppContainer = styled(Box)`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const ProductView = styled(Box)`
  height: ${({ isDrawerOpen }) =>
    isDrawerOpen ? "calc(100vh - 300px)" : "100vh"};
  transition: height 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const BottomDrawer = styled(Box)`
  padding: 16px;
  background-color: #fff;
  overflow: hidden; /* Prevent scrolling inside the drawer */
`;

const ScrollableOptions = styled(Box)`
  display: flex;
  /* overflow-x: auto; */ /* Remove horizontal scrolling */
  padding: 8px;
  flex-wrap: wrap; /* Allow wrapping of items */
`;

const OptionItem = styled(Box)`
  flex: 0 0 auto;
  margin-right: 8px;
  text-align: center;
`;

const ScrollUpIconContainer = styled(Box)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50px;
  width: 60px;
  height: 40px;
  cursor: pointer;
`;

const MobileDrawerApp = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState(0); // for dynamic drawer opening/closing
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const openThreshold = 100; // Minimum swipe distance to open the drawer
  const closeThreshold = 100; // Minimum swipe distance to close the drawer

  // Handle touch start to record initial touch position
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  // Handle touch move to calculate how far the user has dragged
  const handleTouchMove = (e) => {
    touchCurrentY.current = e.touches[0].clientY;
    const distanceMoved = touchStartY.current - touchCurrentY.current;

    if (distanceMoved > 0) {
      // User is dragging up (open drawer)
      setDrawerHeight(distanceMoved);
    } else if (isDrawerOpen && distanceMoved < 0) {
      // User is dragging down (close drawer)
      setDrawerHeight(300 + distanceMoved); // Decrease the height as the user drags down
    }
  };

  // Handle touch end to finalize drawer open or close based on distance
  const handleTouchEnd = () => {
    const distanceMoved = touchStartY.current - touchCurrentY.current;

    if (distanceMoved > openThreshold) {
      // Open drawer if the upward drag is enough
      setDrawerOpen(true);
    } else if (distanceMoved < -closeThreshold && isDrawerOpen) {
      // Close drawer if the downward drag is enough
      setDrawerOpen(false);
    }

    setDrawerHeight(0); // Reset drawer height when done
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerHeight(0); // Reset height when closing
  };

  return (
    <AppContainer>
      {/* Top Product View */}
      <ProductView isDrawerOpen={isDrawerOpen}>
        <img
          src="https://via.placeholder.com/300" // Replace with your product image
          alt="Handbag"
          style={{ maxWidth: "80%" }}
        />
      </ProductView>

      {/* Scroll-Up Icon (always visible when drawer is closed) */}
      {!isDrawerOpen && (
        <ScrollUpIconContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <KeyboardArrowUpIcon />
        </ScrollUpIconContainer>
      )}

      {/* Bottom Drawer */}
      <Drawer
        anchor="bottom"
        open={isDrawerOpen || drawerHeight > 0} // Opens or adjusts based on touch gesture
        onClose={handleCloseDrawer}
        hideBackdrop={true}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          style: {
            height: drawerHeight > 0 ? `${drawerHeight}px` : "300px", // Dynamically adjust height based on touch
            transition: drawerHeight > 0 ? "none" : "height 0.3s ease", // Disable transition while dragging
            borderRadius: "12px 12px 0 0",
            pointerEvents: "auto",
          },
        }}
      >
        <BottomDrawer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Title</Typography>
            {/* Close drawer by touching the icon */}
            <Box onClick={handleCloseDrawer}>
              <KeyboardArrowUpIcon />
            </Box>
          </Box>
          {/* Scrollable Options */}
          <ScrollableOptions>
            {/* Handle Chain */}
            <OptionItem>
              <Typography variant="subtitle2">Handle Chain</Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <img
                    src="https://via.placeholder.com/50" // Replace with actual options
                    alt="Strings"
                  />
                  <Typography variant="caption">Strings</Typography>
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/50" alt="Leather" />
                  <Typography variant="caption">Leather</Typography>
                </Grid>
                {/* Add more options as per your design */}
              </Grid>
            </OptionItem>
            {/* Add more categories like Material, Buckle, etc */}
          </ScrollableOptions>
        </BottomDrawer>
      </Drawer>
    </AppContainer>
  );
};

export default MobileDrawerApp;
import React, { useState, useRef } from "react";
import { SwipeableDrawer, Box, Typography, Grid } from "@mui/material";
import { styled } from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetExperienceDataById } from "../../services";
import IframeResizer from "@iframe-resizer/react";

const AppContainer = styled(Box)`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const ProductView = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const BottomDrawer = styled(Box)`
  padding: 16px;
  background-color: #fff;
`;

const ScrollableOptions = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 200px;
`;

const OptionItem = styled(Box)`
  margin-bottom: 16px;
`;

const ScrollUpIconContainer = styled(Box)`
  position: fixed; /* Keep it fixed */
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 40px;
  cursor: pointer;
  z-index: 10;
`;

const IframeOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1001;
  pointer-events: none;
`;

const MobileDrawerApp = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchCurrentY.current = e.touches[0].clientY;
    const distanceMoved = touchStartY.current - touchCurrentY.current;

    // Open the drawer if dragged upwards
    if (distanceMoved > 30 && !isDrawerOpen) {
      setDrawerOpen(true);
    }
  };

  const handleTouchEnd = () => {
    // Reset touch positions
    touchStartY.current = 0;
    touchCurrentY.current = 0;
  };

  const { data } = useGetExperienceDataById();
  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const canvasUrl = "http://64.227.170.212";
  const sessionId = getData?.sessionID;

  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;

  return (
    <AppContainer>
      <ProductView>
        <Box sx={{ flex: 1, height: "100%", position: "relative" }}>
          <IframeResizer
            id="one"
            src={url}
            scrolling="no"
            height="100%"
            width="100%"
          />
          {isDrawerOpen && <IframeOverlay />}
        </Box>
      </ProductView>

      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        swipeAreaWidth={40}
        hideBackdrop={true}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          style: {
            height: "calc(100vh - 60vh)",
            overflow: "hidden",
          },
        }}
      >
        <BottomDrawer>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Title</Typography>
            <Box onClick={() => setDrawerOpen(false)}>
              <KeyboardArrowUpIcon />
            </Box>
          </Box>
          <ScrollableOptions>
            <OptionItem>
              <Typography variant="subtitle2">Handle Chain</Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <img src="https://via.placeholder.com/50" alt="Strings" />
                  <Typography variant="caption">Strings</Typography>
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/50" alt="Leather" />
                  <Typography variant="caption">Leather</Typography>
                </Grid>
              </Grid>
            </OptionItem>
          </ScrollableOptions>
        </BottomDrawer>
      </SwipeableDrawer>

      <ScrollUpIconContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <KeyboardArrowUpIcon />
      </ScrollUpIconContainer>
    </AppContainer>
  );
};

export default MobileDrawerApp;

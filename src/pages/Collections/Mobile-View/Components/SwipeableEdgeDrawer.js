import React, { useState } from "react";
import { Box, Typography, Grid, Button, Slide } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetExperienceDataById } from "../../services";
import IframeResizer from "@iframe-resizer/react";

const AppContainer = (props) => (
  <Box
    sx={{
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      ...props.sx,
    }}
  >
    {props.children}
  </Box>
);

const ProductView = (props) => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    }}
  >
    {props.children}
  </Box>
);

const ScrollableOptions = ({ onClose, isOptionsOpen }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        maxHeight: "200px",
        padding: "16px",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: isOptionsOpen ? "60px" : "-240px", // Adjust position to not obstruct the iframe
        left: "0",
        right: "0",
        zIndex: 1,
        transition: "bottom 0.3s ease",
        bottom: "0",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
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
      </Box>
      <Button onClick={onClose}>Close</Button>
    </Box>
  </Slide>
);

const MobileDrawerApp = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const { data } = useGetExperienceDataById();
  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const canvasUrl = "http://64.227.170.212";
  const sessionId = getData?.sessionID;

  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;

  const handleToggle = () => {
    setOptionsOpen((prev) => !prev);
  };

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
          <ScrollableOptions
            onClose={() => setOptionsOpen(false)}
            isOptionsOpen={isOptionsOpen}
          />
        </Box>
      </ProductView>

      {/* Right-side Button */}
      <Box
        sx={{
          position: "fixed",
          top: isOptionsOpen ? "calc(100% - 212px)" : "calc(100% - 90px)",
          right: "0px", // Right-side button
          color: "white",
          padding: "8px",
          zIndex: 12,
          cursor: "pointer",
        }}
      >
        <Button variant="contained" sx={{ color: "white" }}>
          Right Button
        </Button>
      </Box>

      {/* Bottom Arrow Icon and Drawer Toggle */}
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={handleToggle}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </AppContainer>
  );
};

export default MobileDrawerApp;

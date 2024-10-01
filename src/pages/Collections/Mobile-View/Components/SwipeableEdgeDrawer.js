import React, { useState } from "react";
import { Box, Typography, Grid, Button, Slide } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetExperienceDataById } from "../../services";
import IframeResizer from "@iframe-resizer/react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WorkIcon from "@mui/icons-material/Work";
import AnimatedMenu from "./AnimatedMenu";

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

const ConfigureOptions = ({ onClose, isOptionsOpen }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "20vh", // Drawer height is set to 20% of the viewport height
        padding: "16px",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: isOptionsOpen ? "0vh" : "-30vh",
        left: "0",
        right: "0",
        zIndex: 1,
        transition: "bottom 0.3s ease",
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
    </Box>
  </Slide>
);

const ShowAllProductsOptions = ({ onClose, isOptionsOpen }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "20vh", // Drawer height set to 20% of the viewport height
        padding: "16px",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: isOptionsOpen ? "0vh" : "-30vh",
        left: "0",
        right: "0",
        zIndex: 1,
        transition: "bottom 0.3s ease",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle2">Products</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <img src="https://via.placeholder.com/50" alt="Strings" />
            <Typography variant="caption">Strings</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Slide>
);

const MobileDrawerApp = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isShowAll, setShowAll] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);

  const { data } = useGetExperienceDataById();
  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const canvasUrl = "http://64.227.170.212";
  const sessionId = getData?.sessionID;

  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;

  const handleToggleOptions = () => {
    setOptionsOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return newValue;
    });
  };

  const handleToggleDisplayComponent = () => {
    setIsDisplayComponent((prev) => !prev);
    setShowAll((prev) => !prev);
    setOptionsOpen(true);
  };

  const drawerHeight = "20vh"; // Adjust the drawer height for dynamic positioning

  return (
    <AppContainer>
      {/* Animated Menu on the left side */}
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 20,
        }}
      >
        <AnimatedMenu />
      </Box>

      <ProductView>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            position: "relative",
          }}
        >
          <IframeResizer
            id="one"
            src={url}
            scrolling="no"
            height="100%"
            width="100%"
          />
          {!isDisplayComponent && (
            <ConfigureOptions
              onClose={() => {
                setOptionsOpen(false);
              }}
              isOptionsOpen={isOptionsOpen}
            />
          )}
          {isDisplayComponent && (
            <ShowAllProductsOptions
              onClose={() => {
                setOptionsOpen(false);
              }}
              isOptionsOpen={isOptionsOpen}
            />
          )}
        </Box>
      </ProductView>

      {/* Right-side Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: isOptionsOpen ? `calc(${drawerHeight} + 50px)` : "40px", // Dynamically positioned based on drawer height
          right: "2px", // Add some margin for better view on mobile
          color: "white",
          padding: "8px",
          zIndex: 12,
          cursor: "pointer",
        }}
      >
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={handleToggleDisplayComponent}
          size="small"
        >
          {isShowAll ? "Show All Products" : "Configure"}
        </Button>
      </Box>

      {/* Left-side Icons when Show All Products is active */}
      {isShowAll && (
        <Box
          sx={{
            position: "fixed",
            bottom: isOptionsOpen ? `calc(${drawerHeight} + 50px)` : "40px", // Dynamically positioned based on drawer height
            left: "2px", // Better padding for small screens
            padding: "8px",
            display: "flex",
            gap: "8px",
            zIndex: 12,
          }}
        >
          <LocalMallIcon />
          <WorkIcon />
        </Box>
      )}

      {/* Bottom Arrow Icon and Drawer Toggle */}
      <Box
        sx={{
          position: "fixed",
          bottom: isOptionsOpen ? `calc(${drawerHeight} + 10px)` : "0px", // Dynamically positioned based on drawer height
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
        onClick={handleToggleOptions}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </AppContainer>
  );
};

export default MobileDrawerApp;

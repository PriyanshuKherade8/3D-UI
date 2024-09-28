import React, { useState } from "react";
import {
  Drawer,
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";

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
`;

const ScrollableOptions = styled(Box)`
  display: flex;
  overflow-x: auto;
  padding: 8px;
`;

const OptionItem = styled(Box)`
  flex: 0 0 auto;
  margin-right: 8px;
  text-align: center;
`;

const MobileDrawerApp = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppContainer>
      <ProductView isDrawerOpen={isDrawerOpen}>
        <IconButton
          onClick={toggleDrawer}
          style={{ position: "absolute", top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>
        <img
          src="https://via.placeholder.com/300"
          alt="Handbag"
          style={{ maxWidth: "80%" }}
        />
      </ProductView>

      {/* Bottom Drawer */}
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        hideBackdrop={true}
        BackdropProps={{ invisible: true }}
        sx={{
          "& .MuiDrawer-paper": {
            height: "300px",
            borderRadius: "12px 12px 0 0",
            pointerEvents: "auto",
          },
        }}
      >
        <BottomDrawer>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Title</Typography>
            <Button variant="outlined" onClick={toggleDrawer}>
              Done
            </Button>
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
      </Drawer>
    </AppContainer>
  );
};

export default MobileDrawerApp;

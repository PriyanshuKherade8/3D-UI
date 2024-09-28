import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Tab,
  Tabs,
} from "@mui/material";
import {
  CameraAlt,
  Folder,
  GridView,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  overscroll-behavior="none";
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  transition: padding-bottom 0.3s ease-in-out;
  padding-bottom: ${(props) =>
    props.drawerOpen ? "300px" : "0"}; /* Prevent content overlap */
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const DrawerContent = styled.div`
  padding: 16px;
  text-align: center;
  transition: height 0.3s ease-in-out; /* Use CSS transition */
  overflow: hidden; /* Prevent overflow during transition */
`;

const OptionContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-top: 16px;
  overscroll-behavior="none"
`;

const OptionItem = styled.div`
  margin-right: 8px;
  text-align: center;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
`;

const OptionImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 5px;
  background-color: gray;
  border-radius: 5px;
  margin: 10px auto;
`;

export default function SwipeableEdgeDrawer() {
  const [drawerHeight, setDrawerHeight] = useState(50); // Initial drawer height (px)
  const [selectedTab, setSelectedTab] = useState("Handle Chain");
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentHeight = useRef(50);

  const MAX_HEIGHT = 300;
  const MIN_HEIGHT = 50;
  const THRESHOLD = 150;

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    const touchY = e.touches[0].clientY;
    const deltaY = startY.current - touchY;
    const newHeight = Math.min(
      Math.max(currentHeight.current + deltaY, MIN_HEIGHT),
      MAX_HEIGHT // Restrict to MAX_HEIGHT
    );
    setDrawerHeight(newHeight);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    currentHeight.current = drawerHeight;

    if (drawerHeight > THRESHOLD) {
      setDrawerHeight(MAX_HEIGHT);
    } else {
      setDrawerHeight(MIN_HEIGHT);
    }
  };

  return (
    <Container

    // border={{ height: "80vh", overscrollBehavior: "none" }}
    >
      <Content drawerOpen={drawerHeight > MIN_HEIGHT}>
        <IconsContainer>
          <div>
            <IconButton>
              <CameraAlt />
            </IconButton>
            <IconButton>
              <Folder />
            </IconButton>
          </div>
          <IconButton>
            <GridView />
          </IconButton>
        </IconsContainer>
      </Content>

      <Drawer
        anchor="bottom"
        open
        variant="persistent"
        PaperProps={{
          style: {
            height: `${drawerHeight}px`,
            overflow: "hidden",
          },
        }}
      >
        <DrawerContent
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <DragHandle />
          {drawerHeight === MAX_HEIGHT && (
            <>
              <Typography variant="h6">Title</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <ArrowBack />
                </IconButton>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </div>
              <Tabs
                value={selectedTab}
                onChange={(_, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Color" value="Color" />
                <Tab label="Handle Chain" value="Handle Chain" />
                <Tab label="Material" value="Material" />
                <Tab label="Buckle" value="Buckle" />
              </Tabs>
              <OptionContainer>
                {["Strings", "Leather", "Silver", "Gold", "Leather"].map(
                  (option, index) => (
                    <OptionItem key={index} selected={index === 3}>
                      <OptionImage
                        src={`/placeholder.svg?height=50&width=50&text=${option}`}
                        alt={option}
                      />
                      <Typography variant="caption">{option}</Typography>
                    </OptionItem>
                  )
                )}
              </OptionContainer>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

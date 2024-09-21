import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CachedIcon from "@mui/icons-material/Cached";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MainPage from "./MainPage";

const Toolbar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton>
            <RedoIcon />
          </IconButton>

          <IconButton>
            <UndoIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton>
            <RedoIcon />
          </IconButton>

          <IconButton>
            <UndoIcon />
          </IconButton>

          <IconButton>
            <WidgetsIcon />
          </IconButton>

          <IconButton>
            <CachedIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const ItemCard = ({ image, title, isSelected, onClick }) => (
  <Card
    elevation={0}
    onClick={onClick}
    style={{
      marginBottom: "10px",
    }}
  >
    <CardActionArea
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="170"
        width="30"
        image={image}
        alt={title}
        style={{
          border: isSelected ? "1px solid #007AFF" : "none",
          height: "164px",
          width: "164px",
          objectFit: "cover",
        }}
      />
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            fontFamily: "Urbanist",
            color: isSelected ? "#007AFF" : "black",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Main = () => {
  const initialCardItems = [
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title1",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title2",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title3",
    },
  ];

  const allProducts = [
    ...initialCardItems,
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title4",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title5",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title6",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleButtonClick = () => {
    setShowAllProducts((prev) => !prev);
  };

  return (
    <Paper elevation={0} style={{ display: "flex", height: "100vh" }}>
      {/* Left screen with image */}
      <Box
        style={{
          width: showAllProducts ? "65%" : "84%",
          transition: "width 0.5s ease",
        }}
      >
        <img
          src="https://i.ibb.co/NKZD0s8/image-4.jpg"
          alt="Left Screen"
          style={{
            width: "100%",
            height: "90%",
            objectFit: "contain",
          }}
        />
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Button variant="contained" size="small">
              {"Controls"}
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleButtonClick}
            >
              {showAllProducts ? "View All Products" : "Configure"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right side with cards */}
      <Box
        style={{
          width: showAllProducts ? "35%" : "16%",
          paddingTop: "4px",
          transition: "width 0.5s ease",
        }}
      >
        <Paper elevation={3} style={{ padding: "10px", marginBottom: "3px" }}>
          {showAllProducts ? "Products" : "Bags"}
        </Paper>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            height: "89vh",
            overflowY: "scroll",
            display: "flex",
            // justifyContent: showAllProducts ? "" : "center",
            // alignItems: "center",
            // border: "1px solid red",
            // justifyContent: "center",
          }}
        >
          <Box
            style={{
              width: "100%",
            }}
          >
            {!showAllProducts &&
              initialCardItems.map((item, index) => (
                <ItemCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  isSelected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            {showAllProducts && <MainPage />}
          </Box>
        </Paper>
      </Box>

      <Toolbar />
    </Paper>
  );
};

export default Main;

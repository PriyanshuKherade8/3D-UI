import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

// Reusable Card Component
const ItemCard = ({ image, title }) => (
  <Card elevation={0}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="180"
        width="40"
        image={image}
        alt={title}
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
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Main = () => {
  const cardItems = [
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
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title4",
    },
  ];

  return (
    <Paper elevation={0} style={{ display: "flex", height: "100vh" }}>
      <Box style={{ width: "75%", border: "1px solid grey" }}>
        {"left screen"}
      </Box>
      <Box style={{ width: "25%", paddingTop: "4px" }}>
        <Paper elevation={3} style={{ padding: "10px", marginBottom: "5px" }}>
          {"Bags"}
        </Paper>
        <Paper
          elevation={3}
          style={{ padding: "10px", height: "89vh", overflowY: "scroll" }}
        >
          <Box>
            {cardItems.map((item, index) => (
              <ItemCard key={index} image={item.image} title={item.title} />
            ))}
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Main;

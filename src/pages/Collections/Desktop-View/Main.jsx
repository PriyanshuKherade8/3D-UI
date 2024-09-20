import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
//   <img src="https://i.ibb.co/NKZD0s8/image-4.jpg" />
const ItemCard = ({ image, title, isSelected, onClick }) => (
  <Card elevation={0} onClick={onClick} style={{ marginBottom: "10px" }}>
    <CardActionArea>
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
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <Paper elevation={0} style={{ display: "flex", height: "100vh" }}>
      <Box style={{ width: "84%", border: "1px solid grey" }}>
        {"left screen"}
      </Box>
      <Box style={{ width: "16%", paddingTop: "4px" }}>
        <Paper elevation={3} style={{ padding: "10px", marginBottom: "5px" }}>
          {"Bags"}
        </Paper>
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            height: "89vh",
            overflowY: "scroll",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            {cardItems.map((item, index) => (
              <ItemCard
                key={index}
                image={item.image}
                title={item.title}
                isSelected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Main;

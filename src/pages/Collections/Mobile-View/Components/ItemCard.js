import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

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
      <Box
        style={{
          border: isSelected ? "1px solid #007AFF" : "none",
          height: "164px",
          width: "164px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          height="170"
          image={image}
          alt={title}
          style={{
            height: "120px",
            width: "98.28px",
            objectFit: "cover",
          }}
        />
      </Box>
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

export default ItemCard;

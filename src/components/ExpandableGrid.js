import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ExpandableGrid = ({
  title,
  items,
  itemPerRow = 4,
  totalRows = 1,
  displayImage = "square",
  onItemSelect,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayedItems = expanded
    ? items
    : items.slice(0, itemPerRow * totalRows);

  return (
    <Box mb={2}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out",
          maxHeight: expanded ? "1000px" : "250px",
        }}
      >
        <Grid container spacing={2} justifyContent="flex-start">
          {/* Align items to start */}
          {displayedItems.map((item, index) => (
            <Grid
              item
              xs={12 / itemPerRow}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                variant="outlined"
                sx={{
                  height: 146,
                  width: 146,
                  marginBottom: "1px",
                }}
              >
                <CardActionArea onClick={() => onItemSelect(item.variant)}>
                  <CardMedia
                    component="img"
                    height="90"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      objectFit: "cover",
                      borderRadius: displayImage === "circle" ? "50%" : "0%",
                      width: displayImage === "circle" ? "90px" : "100%",
                      height: displayImage === "circle" ? "90px" : "90px",
                      margin: "auto",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" align="center">
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        mt={2}
        style={{
          border: "1px solid grey",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Button
          variant="text"
          onClick={handleToggleExpand}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {expanded ? "View Less" : "View All"}
        </Button>
      </Box>
    </Box>
  );
};

export default ExpandableGrid;

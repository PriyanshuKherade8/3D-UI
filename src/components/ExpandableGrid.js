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

// Reusable Expandable Grid Component
const ExpandableGrid = ({ title, items, itemPerRow = 4, totalRows = 1 }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  // Calculate the number of items to show based on whether expanded or not
  const displayedItems = expanded
    ? items
    : items.slice(0, itemPerRow * totalRows);

  return (
    <Box mb={2}>
      {/* Section Title */}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {/* Grid Container with transition effect */}
      <Box
        sx={{
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out", // Smooth transition for both expand/collapse
          maxHeight: expanded ? "1000px" : "250px", // Adjust based on collapsed/expanded state
          border: "1px solid green",
        }}
      >
        <Grid container spacing={2} justifyContent="flex-start">
          {" "}
          {/* Align items to start */}
          {displayedItems.map((item, index) => (
            <Grid
              item
              xs={12 / itemPerRow} // Dynamically set grid width based on itemPerRow
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card sx={{ height: 146, border: "1px solid red", width: 146 }}>
                {" "}
                {/* Fixed card height */}
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="90" // Fixed height for the image
                    image={item.image}
                    alt={item.title}
                    sx={{
                      objectFit: "cover",
                    }} // Ensures image covers the area
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

      {/* Expand/Collapse Button */}
      <Box display="flex" justifyContent="center" mt={2}>
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

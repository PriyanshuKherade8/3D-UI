import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Reusable Expandable Grid Component
const ExpandableGrid = ({ title, items, itemPerRow = 3, totalRows = 1 }) => {
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

      {/* Grid Items */}
      <Grid container spacing={2}>
        {displayedItems.map((item, index) => (
          <Grid item xs={12 / itemPerRow} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.image}
                  alt={item.title}
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

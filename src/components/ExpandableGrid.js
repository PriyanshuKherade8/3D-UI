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
  Tooltip,
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
  selectedItem, // Add selectedItem prop
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
          {displayedItems.map((item, index) => (
            <Grid
              item
              xs={12 / itemPerRow}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box variant="outlined" sx={{ height: 146, width: 146 }}>
                <CardActionArea onClick={() => onItemSelect(item.variant)}>
                  <Box
                    sx={{
                      width: "68px",
                      height: "68px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border:
                        selectedItem?.variant?.variant_id ===
                        item?.variant?.variant_id
                          ? "2px solid blue" // Adjust border color for selected item
                          : "1px solid transparent",
                      borderRadius: "50%",
                      margin: "auto",
                      overflow: "hidden", // Ensure image stays within the border
                    }}
                  >
                    <img
                      src={item?.image}
                      alt={item?.title}
                      style={{
                        height: "62px",
                        width: "62px",
                        borderRadius: "50%", // Make the image circular
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Tooltip title={item.title}>
                      <Typography
                        variant="body1"
                        align="center"
                        noWrap
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.variant?.display_name}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                </CardActionArea>
              </Box>
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

import React from "react";
import ExpandableGrid from "../../../components/ExpandableGrid";
import { Box } from "@mui/material";

// Sample data for items
const itemsData = [
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title1",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title2",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title3",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title4",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title5",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title6",
  },
  {
    image: "https://via.placeholder.com/100",
    title: "Item Title7",
  },
];

const MainPage = () => {
  return (
    <Box>
      {/* Example 1: Base Section */}
      <ExpandableGrid
        title="Base"
        items={itemsData}
        itemPerRow={3}
        totalRows={1}
      />

      {/* Example 2: Material Section */}
      <ExpandableGrid
        title="Material"
        items={itemsData}
        itemPerRow={4}
        totalRows={1}
      />
    </Box>
  );
};

export default MainPage;

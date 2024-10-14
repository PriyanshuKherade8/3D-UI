import React, { useState } from "react";
import { Box, Slider } from "@mui/material";
import { styled } from "@mui/system";

// Styled component to hide scrollbar
const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Change to vertical layout
  overflowY: "auto",
  scrollbarWidth: "none", // for Firefox
  "&::-webkit-scrollbar": {
    display: "none", // for Chrome, Safari, and Edge
  },
  "-ms-overflow-style": "none", // for Internet Explorer and Edge
}));

// Styled individual item
const Item = styled(Box)(({ theme, isActive }) => ({
  minHeight: "80px", // Customize as per design
  padding: "10px",
  border: isActive ? "2px solid blue" : "2px solid transparent",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: isActive ? "#f5f5f5" : "#e0e0e0",
  margin: "10px 0", // Change margin for vertical layout
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "& img": {
    width: "100%",
    height: "auto",
  },
}));

const Chapters = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active item

  const items = [
    {
      title: "Adjustable handle",
      img: "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
    },
    {
      title: "Adjustable handle",
      img: "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
    },
    {
      title: "Adjustable handle",
      img: "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
    },
  ];

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  return (
    <Box sx={{ paddingTop: "4px", height: "100%" }}>
      <ScrollableContainer>
        {items.map((item, index) => (
          <Item
            key={index}
            isActive={activeIndex === index}
            onClick={() => handleClick(index)}
          >
            <Box
              display="flex"
              justifyContent="center"
              style={{ height: "75px", width: "100%" }}
            >
              <img src={item.img} alt={item.title} />
            </Box>
            <Slider
              defaultValue={0}
              aria-label="Slider"
              sx={{ width: "90%", marginTop: "10px" }}
              disabled={activeIndex !== index} // Disable slider when not active
            />
          </Item>
        ))}
      </ScrollableContainer>
    </Box>
  );
};

export default Chapters;

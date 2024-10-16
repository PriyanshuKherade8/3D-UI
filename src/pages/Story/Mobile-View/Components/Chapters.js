import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled component to hide scrollbar
const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollbarWidth: "none", // for Firefox
  "&::-webkit-scrollbar": {
    display: "none", // for Chrome, Safari, and Edge
  },
  "-ms-overflow-style": "none", // for Internet Explorer and Edge
}));

// Styled individual item
const Item = styled(Box)(({ theme, isActive }) => ({
  minWidth: "200px", // Customize as per design
  padding: "10px",
  border: isActive ? "2px solid blue" : "2px solid transparent",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: isActive ? "#f5f5f5" : "#e0e0e0",
  margin: "0 10px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "& img": {
    width: "100%",
    height: "auto",
  },
}));

const HorizontalScrollComponent = ({ getData }) => {
  const chapterList = getData?.experience?.chapter_list || [];
  console.log("chapterList", chapterList);

  const [activeIndex, setActiveIndex] = useState(null); // State to track the active item

  // Placeholder image (can be replaced with chapter-specific images if available)
  const placeholderImg =
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8";

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  return (
    <Box sx={{ paddingTop: "4px", height: "100%" }}>
      <ScrollableContainer style={{ height: "140px" }}>
        {chapterList.map((chapter, index) => (
          <Item
            key={chapter.chapter_id}
            isActive={activeIndex === index}
            onClick={() => handleClick(index)}
          >
            <Typography
              variant="caption"
              sx={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {chapter.display_title}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              style={{ height: "45px", width: "100%" }}
            >
              <img src={placeholderImg} alt={chapter.display_title} />
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

export default HorizontalScrollComponent;

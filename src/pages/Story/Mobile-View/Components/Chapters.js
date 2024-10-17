import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSetActionCall } from "../../../Collections/services";

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
  const sessionId = getData?.sessionID;
  const chapterList = getData?.experience?.chapter_list || [];
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active item

  // Function to create a sequential order based on is_first_chapter and previous_chapter
  const createChapterSequence = (chapters) => {
    const sequence = [];
    const chapterMap = new Map();

    // Create a map of chapters by their chapter_id for quick lookup
    chapters.forEach((chapter) => {
      chapterMap.set(chapter.chapter_id, chapter);
    });

    // Find the first chapter using is_first_chapter: true
    let currentChapter = chapters.find((chapter) => chapter.is_first_chapter);

    // Traverse the chapters in sequence by following previous_chapter
    while (currentChapter) {
      sequence.push(currentChapter); // Add current chapter to sequence
      const nextChapterId = chapters.find(
        (chapter) => chapter.previous_chapter[0] === currentChapter.chapter_id
      )?.chapter_id;
      currentChapter = chapterMap.get(nextChapterId) || null;
    }

    return sequence;
  };

  const orderedChapters = createChapterSequence(chapterList);
  console.log("orderedChapters", orderedChapters);

  // Placeholder image
  const placeholderImg =
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8";

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  const { mutate: sendRotateCall } = useSetActionCall();

  const handleChapter = (chapterId) => {
    const payload = {
      session_id: sessionId,
      type: "chapter_chapter",
      message: { chapter_id: chapterId },
    };
    sendRotateCall(payload);
  };

  return (
    <Box sx={{ paddingTop: "4px", height: "100%" }}>
      <ScrollableContainer style={{ height: "140px" }}>
        {orderedChapters?.map((chapter, index) => (
          <Item
            key={chapter.chapter_id}
            isActive={activeIndex === index}
            onClick={() => {
              handleClick(index);
              handleChapter(chapter.chapter_id); // Send chapter_id on click
            }}
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

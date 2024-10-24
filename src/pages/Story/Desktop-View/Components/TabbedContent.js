import { Box } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
// import Configure from "../../Mobile-View/Components/Configure";
import HorizontalScrollComponent from "../../Mobile-View/Components/Chapters";
import Chapters from "./Chapters";
import Configure from "./Configure";

// Styled component for the tab container
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(27, 123, 225, 0.08);
  border-radius: 20px;
  margin: 0px 25px;
`;

// Styled component for individual tabs
const Tab = styled.button`
  background-color: ${({ selected }) => (selected ? "#007BFF" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border: none;
  border-radius: 20px;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#007BFF" : "#e0e0e0")};
  }
  width: 100%;
`;

const ContentContainer = styled.div`
  text-align: center;
  padding: 5px;
`;

// Content for different tabs
const Description = ({ matchedChapter }) => (
  <ContentContainer>
    <h2>{matchedChapter?.display_title}</h2>
    <p>{matchedChapter?.display_text}</p>
  </ContentContainer>
);

const TabbedContent = ({
  matchedChapter,
  getData,
  currVariant,
  chapterList,
}) => {
  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <Box>
      {/* Tabs */}

      <TabContainer>
        <Tab
          selected={selectedTab === "description"}
          onClick={() => setSelectedTab("description")}
        >
          Description
        </Tab>
        <Tab
          selected={selectedTab === "configure"}
          onClick={() => setSelectedTab("configure")}
        >
          Configure
        </Tab>
        <Tab
          selected={selectedTab === "chapters"}
          onClick={() => setSelectedTab("chapters")}
        >
          Chapters
        </Tab>
      </TabContainer>

      {/* Content Based on Selected Tab */}
      {selectedTab === "description" && (
        <Description matchedChapter={matchedChapter} />
      )}
      {selectedTab === "configure" && (
        <Configure getData={getData} currVariant={currVariant} />
      )}
      {selectedTab === "chapters" && (
        <Chapters chapterList={chapterList} getData={getData} />
      )}
    </Box>
  );
};

export default TabbedContent;

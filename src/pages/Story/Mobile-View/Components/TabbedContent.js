import { Box } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
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
const Description = () => (
  <ContentContainer>
    <h2>Handle</h2>
    <p>
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem
    </p>
  </ContentContainer>
);

// const Configure = () => (
//   <ContentContainer>
//     <h2>Configure</h2>
//     <p>Configure your product here with detailed settings and options.</p>
//   </ContentContainer>
// );

const Chapters = () => (
  <ContentContainer>
    <h2>Chapters</h2>
    <p>Here are the different chapters and sections available.</p>
  </ContentContainer>
);

const TabbedContent = () => {
  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <Box style={{}}>
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
      {selectedTab === "description" && <Description />}
      {selectedTab === "configure" && <Configure />}
      {selectedTab === "chapters" && <Chapters />}
    </Box>
  );
};

export default TabbedContent;

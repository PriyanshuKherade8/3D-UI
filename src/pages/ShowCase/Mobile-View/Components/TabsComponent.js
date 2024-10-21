import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";

const StyledTabPanel = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  min-height: 150px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Pagination = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const TabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrev = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleNext = () => {
    if (value < tabData.length - 1) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  const tabData = [
    { label: "Actname 1", description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum" },
    { label: "Actname 2", description: "IpsumLorem IpsumLorem IpsumLorem" },
    { label: "Actname 3", description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum" },
    { label: "Actname 4", description: "IpsumLorem IpsumLorem IpsumLorem" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs Header */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs with navigation"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { backgroundColor: "#1976d2" } }}
      >
        {tabData.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Tab Content with Navigation */}
      {tabData.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {value === index && (
            <StyledTabPanel>
              <NavContainer>
                <Typography variant="h6">
                  Handle {index + 1}/{tabData.length}
                </Typography>
                <div>
                  <IconButton onClick={handlePrev} disabled={value === 0}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    disabled={value === tabData.length - 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </NavContainer>
              <Typography>{tab.description}</Typography>
            </StyledTabPanel>
          )}
        </div>
      ))}
    </Box>
  );
};

export default TabsComponent;

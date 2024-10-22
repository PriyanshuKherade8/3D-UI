import React, { useState, useEffect } from "react";
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

const TabsComponent = ({ actList, interactionId }) => {
  const [value, setValue] = useState(0);

  // Sort actList: is_launch_act first, then by display_sequence
  const sortedActList = actList?.sort(
    (a, b) =>
      b.is_launch_act - a.is_launch_act ||
      a.display_sequence - b.display_sequence
  );

  // Find the act index where the interactionId matches
  useEffect(() => {
    if (interactionId) {
      const actIndex = sortedActList?.findIndex((act) =>
        act.interactions?.some(
          (interaction) => interaction.interaction_id === interactionId
        )
      );
      if (actIndex !== -1) {
        setValue(actIndex);
      }
    }
  }, [interactionId, sortedActList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrev = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handleNext = () => {
    if (value < sortedActList.length - 1) {
      setValue((prevValue) => prevValue + 1);
    }
  };

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
        {sortedActList?.map((act, index) => (
          <Tab key={index} label={act.act_title} />
        ))}
      </Tabs>

      {/* Tab Content with Navigation */}
      {sortedActList?.map((act, index) => (
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
                  Handle {index + 1}/{sortedActList.length}
                </Typography>
                <div>
                  <IconButton onClick={handlePrev} disabled={value === 0}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    disabled={value === sortedActList.length - 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </NavContainer>
              <Typography>{act.act_text}</Typography>
            </StyledTabPanel>
          )}
        </div>
      ))}
    </Box>
  );
};

export default TabsComponent;

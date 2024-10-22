import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

const StyledAccordion = styled(Accordion)`
  margin-bottom: 16px;
  box-shadow: none;
  //   border: 1px solid #e0e0e0;

  &.MuiAccordion-root:before {
    display: none;
  }
`;

const ActComponent = ({ actList }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {actList?.map((act, index) => (
        <StyledAccordion
          key={act.act_id}
          expanded={expanded === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography
              sx={{ fontWeight: "500", fontSize: "20px", color: "#4B5563" }}
            >
              {act.act_title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
              {act.act_text}
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default ActComponent;

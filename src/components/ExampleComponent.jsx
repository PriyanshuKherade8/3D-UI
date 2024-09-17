import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { themeKeys } from "../themeConfig";
import { Typography } from "@mui/material";

const StyledDiv = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
`;

const StyledBox = styled(Box)(({ fontSize, fontFamily, color }) => ({
  fontSize: fontSize,
  fontFamily: fontFamily,
  color: color,
}));

const ExampleComponent = () => {
  const {
    [themeKeys.FONT_SIZE]: fontSize,
    [themeKeys.FONT_FAMILY]: fontFamily,
    [themeKeys.COLOR]: color,
  } = useSelector((state) => state.fontStyles);

  return (
    <>
      <StyledDiv fontSize={fontSize} fontFamily={fontFamily} color={color}>
        <h1>Example Component</h1>
      </StyledDiv>
      <StyledBox fontSize={fontSize} fontFamily={fontFamily} color={color}>
        <p>This component uses dynamic font styles from Redux.</p>
      </StyledBox>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
    </>
  );
};

export default ExampleComponent;

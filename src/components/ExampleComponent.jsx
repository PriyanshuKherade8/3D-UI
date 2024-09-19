// ExampleComponent.js

import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { themeKeys } from "../themeConfig";

const ExampleComponent = () => {
  const { components } = useSelector((state) => state.fontStyles);

  return (
    <>
      <Box
        sx={{
          fontSize: components.Box.fontSize,
          fontFamily: components.Box.fontFamily,
          color: components.Box.color,
          backgroundColor: components.Box.backgroundColor,
        }}
      >
        <Typography variant="h6">Styled Box Component</Typography>
      </Box>
      <Card
        sx={{
          fontSize: components.Card.fontSize,
          fontFamily: components.Card.fontFamily,
          color: components.Card.color,
          backgroundColor: components.Card.backgroundColor,
        }}
      >
        <Typography variant="body1">Styled Card Component</Typography>
      </Card>
    </>
  );
};

export default ExampleComponent;

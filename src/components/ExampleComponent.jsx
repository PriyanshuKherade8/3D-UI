import styled from "styled-components";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

const StyledDiv = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
`;

const StyledBox = styled(Box)(({ fontSize, fontFamily, color }) => ({
  fontSize: fontSize || "16px",
  fontFamily: fontFamily || "Arial, sans-serif",
  color: color || "black",
}));

const ExampleComponent = () => {
  const { fontSize, fontFamily, color } = useSelector(
    (state) => state.fontStyles
  );

  return (
    <>
      <StyledDiv fontSize={fontSize} fontFamily={fontFamily} color={color}>
        <h1>Example Component</h1>
      </StyledDiv>
      <StyledBox fontSize={fontSize} fontFamily={fontFamily} color={color}>
        <p>This component uses dynamic font styles from Redux.</p>
      </StyledBox>
    </>
  );
};

export default ExampleComponent;

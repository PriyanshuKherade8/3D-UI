import React, { useState } from "react";
import { useGetExperienceDataById, useSetActionCall } from "../services";
import { Box, Typography } from "@mui/material";
import IframeResizer from "@iframe-resizer/react";
import BottomDrawer from "../../../components/BottomDrawer";
import AnimatedMenu from "./Components/AnimatedMenu";

const MobileMain = () => {
  const { data } = useGetExperienceDataById();
  const getData = data?.data;
  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const canvasUrl = "http://64.227.170.212";
  const sessionId = getData?.sessionID;

  const url = `${canvasUrl}?experience=${experienceId}&product=${productKey}&session=${sessionId}`;
  console.log("Constructed URL:", url);

  const [rotate, setRotate] = useState(false);
  const controlId = getData?.experience?.controls?.[0]?.control_id;
  const { mutate: sendRotateCall } = useSetActionCall();
  return (
    <Box
      sx={{
        flex: 1,
        height: "100vh",
        position: "relative",
      }}
    >
      <IframeResizer
        id="one"
        src={url}
        scrolling="no"
        height="100%"
        width="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: "transparent",
        }}
      >
        <BottomDrawer />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 20,
        }}
      >
        <AnimatedMenu
          rotate={rotate}
          setRotate={setRotate}
          controlId={controlId}
          sessionId={sessionId}
          sendRotateCall={sendRotateCall}
        />
      </Box>
    </Box>
  );
};

export default MobileMain;

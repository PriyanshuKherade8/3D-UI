import { Box, Paper, useMediaQuery, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useParams } from "react-router-dom";
import {
  useGetExperienceDataById,
  useSetActionCall,
  useSetProductChangeCall,
} from "../../Collections/services";
import IframeResizer from "@iframe-resizer/react";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import MediaControlBar from "../Mobile-View/Components/MediaControlBar";
import TabbedContent from "./Components/TabbedContent";

const Toolbar = ({
  rotate,
  setRotate,
  sessionId,
  sendRotateCall,
  controlId,
}) => {
  const handleRotate = () => {
    setRotate((prev) => {
      const newRotateValue = !prev;
      const payload = {
        session_id: sessionId,
        message: {
          type: "control",
          message: { control_id: controlId, value: newRotateValue.toString() },
        },
      };
      sendRotateCall(payload);
      return newRotateValue;
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
        <IconButton onClick={handleRotate}>
          <RedoIcon />
        </IconButton>
        <IconButton>
          <UndoIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

const MediaControlBarComp = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        bottom: "20px",
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <MediaControlBar />
    </Box>
  );
};

const StoryDesktopView = () => {
  const [rotate, setRotate] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true); // Panel is open by default

  const { id } = useParams();
  const { data } = useGetExperienceDataById(id);
  const productList = data?.data?.experience?.collection?.items;

  const isTablet = useMediaQuery("(max-width:960px)");
  const canvasUrl = "http://64.227.170.212";
  const sessionId = data?.data?.sessionID;
  const experienceId = data?.data?.experience?.experience_id;
  const productKey = data?.data?.experience?.products[0]?.product_key;
  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;

  const { mutate: sendRotateCall } = useSetActionCall();
  const { mutate: changeProductCall } = useSetProductChangeCall();
  const controlId = data?.data?.experience?.controls?.[0]?.control_id;

  useEffect(() => {
    if (productList) {
      const payloadForItemChange = {
        session_id: sessionId,
        message: {
          type: "change_item",
          message: { item_id: productList?.[0]?.item_id },
        },
      };
      changeProductCall(payloadForItemChange);
    }
  }, [productList]);

  return (
    <Paper elevation={0} style={{ display: "flex", height: "100vh" }}>
      {/* Left side or main container */}
      <Box
        sx={{
          width: panelOpen ? (isTablet ? "75%" : "75%") : "97%",
          height: "100vh",
          transition: "width 0.2s ease",
          display: "flex",
          flexDirection: "column",

          position: "relative",
        }}
      >
        <IframeResizer src={url} height="100%" width="100%" />

        {/* MediaControlBar at the bottom and centered */}
        <MediaControlBarComp />
      </Box>

      {/* Right side */}
      {!panelOpen && (
        <Box
          sx={{
            width: "3%", // Small panel when closed
            position: "absolute",
            top: "0",
            right: "0",
            height: "100%",
            zIndex: 1000,
          }}
        >
          <Paper elevation={3} sx={{ height: "100%" }}>
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                left: "-20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              onClick={() => setPanelOpen(true)} // User can click to open the panel
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "20px" }} />
            </Box>
          </Paper>
        </Box>
      )}

      {/* Right panel that opens with content */}
      {panelOpen && (
        <Box
          sx={{
            width: isTablet ? "25%" : "25%", // Panel size when open
            height: "100vh",
            transition: "width 0.2s ease",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "-20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
            onClick={() => setPanelOpen(false)} // User can click to close the panel
          >
            <ArrowForwardIosOutlinedIcon sx={{ fontSize: "20px" }} />
          </Box>
          <Box style={{ padding: "15px" }}>{"Title"}</Box>

          <Box style={{ padding: "15px" }}>
            <TabbedContent />
          </Box>
        </Box>
      )}

      <Toolbar
        rotate={rotate}
        setRotate={setRotate}
        controlId={controlId}
        sessionId={sessionId}
        sendRotateCall={sendRotateCall}
      />
    </Paper>
  );
};

export default StoryDesktopView;

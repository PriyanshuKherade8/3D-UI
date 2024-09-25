import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CachedIcon from "@mui/icons-material/Cached";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MainPage from "./MainPage";
import IframeResizer from "@iframe-resizer/react";
import { useGetExperienceDataById, useSetActionCall } from "../services";
import io from "socket.io-client";
import useSocket from "../../../hooks/useSocketMessages";

const Toolbar = ({
  rotate,
  setRotate,
  sessionId,
  sendRotateCall,
  controlId,
}) => {
  console.log("rotate", rotate);
  // const handleRotate = () => {
  //   const newRotateValue = !rotate;
  //   setRotate(newRotateValue);

  //   const payload = {
  //     session_id: sessionId,
  //     message: {
  //       type: "control",
  //       message: { control_id: controlId, value: newRotateValue.toString() },
  //     },
  //   };

  //   console.log("payload", payload);
  //   sendRotateCall(payload);
  // };

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

      console.log("payload", payload);
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
      <Box>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton>
            <RedoIcon onClick={handleRotate} />
          </IconButton>
          <IconButton>
            <UndoIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <UndoIcon />
          </IconButton>
          <IconButton>
            <WidgetsIcon />
          </IconButton>
          <IconButton>
            <CachedIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const ItemCard = ({ image, title, isSelected, onClick }) => (
  <Card
    elevation={0}
    onClick={onClick}
    style={{
      marginBottom: "10px",
    }}
  >
    <CardActionArea
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="170"
        image={image}
        alt={title}
        style={{
          border: isSelected ? "1px solid #007AFF" : "none",
          height: "164px",
          width: "164px",
          objectFit: "cover",
        }}
      />
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "500",
            fontFamily: "Urbanist",
            color: isSelected ? "#007AFF" : "black",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const Main = () => {
  const [rotate, setRotate] = useState(false);
  const initialCardItems = [
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title1",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title2",
    },
    {
      image:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
      title: "Item Title3",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [showNewPaper, setShowNewPaper] = useState(false);

  const handleButtonClick = () => {
    setShowAllProducts((prev) => !prev);
    setShowNewPaper(false);
  };

  const handleIconClick = () => {
    setShowNewPaper(true);
  };
  const { data } = useGetExperienceDataById();
  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const sessionId = getData?.sessionID;

  const isTablet = useMediaQuery("(max-width:960px)");
  const canvasUrl = "http://64.227.170.212";
  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;
  console.log("url", url);
  const URL = "http://143.110.186.134";
  const socket = io(URL, { autoConnect: false });
  console.log("socket", socket);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { currProductKey, chapterList, currPlayMode, currActId, currItemId } =
    useSocket(socket);

  const { mutate: sendRotateCall } = useSetActionCall();
  const controlId = getData?.experience?.controls?.[0]?.control_id;

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
      console.log("sessionId on canvas", sessionId);
      socket.auth = { sessionId };
      socket.connect();
      setIsSocketConnected(true);
    }
  }, [sessionId]);

  return (
    <Paper elevation={0} style={{ display: "flex", height: "100vh" }}>
      {/* Left side */}
      <Box
        sx={{
          width: showNewPaper
            ? "97%"
            : showAllProducts
            ? isTablet
              ? "60%"
              : "65%"
            : isTablet
            ? "75%"
            : "84%",
          height: "100vh", // Ensure full height
          transition: "width 0.5s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <IframeResizer
            id="one"
            src={url}
            scrolling="no"
            height="100%"
            width="100%"
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            {showAllProducts && (
              <Button variant="contained" size="small">
                Controls
              </Button>
            )}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleButtonClick}
            >
              {showAllProducts ? "View All Products" : "Configure"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right side */}
      {!showNewPaper && (
        <Box
          sx={{
            width: showAllProducts
              ? isTablet
                ? "40%"
                : "35%"
              : isTablet
              ? "25%"
              : "16%",
            height: "100vh", // Ensure full height
            transition: "width 0.5s ease",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper elevation={3} style={{ padding: "10px", marginBottom: "3px" }}>
            {showAllProducts ? "Products" : "Bags"}
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "10px",
              height: "calc(100% - 46px)",
              overflowY: "auto",
            }}
          >
            <Box sx={{ width: "100%" }}>
              {!showAllProducts && (
                <>
                  {initialCardItems.map((item, index) => (
                    <ItemCard
                      key={index}
                      image={item.image}
                      title={item.title}
                      isSelected={selectedIndex === index}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
                </>
              )}
              {showAllProducts && <MainPage />}
            </Box>
          </Paper>

          {/* Add Icon to the right side of the box */}
          {showAllProducts && (
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
              onClick={handleIconClick}
            >
              <ArrowForwardIosOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* New Paper that shows on click */}
      {showNewPaper && (
        <Box
          sx={{
            width: "3%",
            position: "absolute",
            top: "0",
            right: "0",
            height: "100%",
            zIndex: 1000,
          }}
        >
          <Paper elevation={3} style={{ height: "100%" }}>
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
            >
              <ArrowBackIosNewOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
                onClick={() => {
                  setShowNewPaper(false);
                  setShowAllProducts(true);
                }}
              />
            </Box>
          </Paper>
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

export default Main;

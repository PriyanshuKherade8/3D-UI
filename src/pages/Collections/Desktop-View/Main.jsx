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
  Tooltip,
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
import {
  useGetExperienceDataById,
  useSetActionCall,
  useSetProductChangeCall,
} from "../services";
import io from "socket.io-client";
import useSocket from "../../../hooks/useSocketMessages";
import { useParams } from "react-router-dom";

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
      {/* <Box>
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
      </Box> */}
    </Box>
  );
};

const Views = ({ viewActionData, sessionId, collectionActionData }) => {
  const { mutate: changeViewCall } = useSetProductChangeCall();

  const handleViewChange = (view) => {
    const item = collectionActionData?.items?.[0];

    if (!item) {
      console.error("No item found in collectionActionData");
      return;
    }

    const viewPayload = {
      session_id: sessionId,
      message: {
        type: "change_view",
        message: {
          item_id: item.item_id,
          product_key: item.product.product_key,
          view_id: view.view_id,
        },
      },
    };

    changeViewCall(viewPayload);
  };

  return (
    <Box>
      <Box>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "row" }}>
          {/* Map through viewActionData to display the icons */}
          {viewActionData?.map((view) => {
            // Find the icon with file_type "L"
            const largeIcon = view.view_icons.find(
              (icon) => icon.file_type === "L"
            );
            return (
              <Tooltip
                key={view.view_id}
                title={view.view_name || view.bag_name}
              >
                <IconButton onClick={() => handleViewChange(view)}>
                  <img
                    src={largeIcon.path}
                    alt={view.view_name || view.bag_name}
                    style={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Tooltip>
            );
          })}
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
      <Box
        style={{
          border: isSelected ? "1px solid #007AFF" : "none",
          height: "164px",
          width: "164px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          height="170"
          image={image}
          alt={title}
          style={{
            height: "120px",
            width: "98.28px",
            objectFit: "cover",
          }}
        />
      </Box>
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [showNewPaper, setShowNewPaper] = useState(false);
  const [showButtonsLayout, setShowButtonsLayout] = useState(false);

  const handleButtonClick = () => {
    setShowAllProducts((prev) => !prev);
    setShowNewPaper(false);
  };

  const handleIconClick = () => {
    setShowNewPaper(true);
  };
  const { id } = useParams();
  const { data } = useGetExperienceDataById(id);

  const viewActionData = data?.data?.experience?.collection?.items?.[0]?.views;
  const collectionActionData = data?.data?.experience?.collection;

  const productList = data?.data?.experience?.collection?.items;

  const initialCardItems = productList?.map((product) => {
    const image = product.item_icons.find(
      (icon) => icon.file_type === "L"
    )?.path;
    return {
      image: image || "https://i.ibb.co/2sGqztG/2.jpg",
      // image: image || "",
      title: product.item_display_short_title || "Untitled",
      product_id: product?.product?.product_id,
      product: product?.product,
      item_id: product?.item_id,
    };
  });

  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const sessionId = getData?.sessionID;

  const isTablet = useMediaQuery("(max-width:960px)");
  const canvasUrl = "http://64.227.170.212";
  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;

  const URL = "http://143.110.186.134";
  const socket = io(URL, { autoConnect: false });

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { currProductKey, chapterList, currPlayMode, currActId, currItemId } =
    useSocket(socket);

  const { mutate: sendRotateCall } = useSetActionCall();
  const { mutate: changeProductCall } = useSetProductChangeCall();

  const controlId = getData?.experience?.controls?.[0]?.control_id;

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
      socket.auth = { sessionId };
      socket.connect();
      setIsSocketConnected(true);
    }
  }, [sessionId]);

  const selectedItem =
    initialCardItems && initialCardItems.length > 0 // Check if initialCardItems exists and is not empty
      ? selectedIndex !== null && selectedIndex < initialCardItems.length
        ? [initialCardItems[selectedIndex]] // Use item at selectedIndex if valid
        : initialCardItems.find((item) => item.item_id === currItemId)
        ? [initialCardItems.find((item) => item.item_id === currItemId)] // Use item found by currItemId
        : [initialCardItems[0]] // Fallback to the first item if no selection
      : []; // Return empty array if initialCardItems is undefined or empty

  const payloadForItemChange = {
    session_id: sessionId,
    message: {
      type: "change_item",
      message: { item_id: selectedItem?.[0]?.item_id },
    },
  };

  useEffect(() => {
    if (selectedItem.length > 0) {
      changeProductCall(payloadForItemChange);
    }
  }, [selectedIndex]);

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
          transition: "width 0.2s ease",
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
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            // border: "1px solid red",
          }}
        > */}
        <Box
          style={{
            // display: "flex",
            // justifyContent: "space-between",
            // padding: "5px",
            position: "fixed",
            bottom: "0%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 1000,
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {showAllProducts && (
            <Views
              viewActionData={viewActionData}
              sessionId={sessionId}
              collectionActionData={collectionActionData}
            />
          )}
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
            height: "100vh",
            transition: "width 0.2s ease",
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
                  {initialCardItems?.map((item, index) => (
                    <ItemCard
                      key={index}
                      image={item.image}
                      title={item.title}
                      isSelected={selectedIndex === index}
                      onClick={() => {
                        setSelectedIndex(index);
                        // setShowAllProducts((prev) => !prev);
                      }}
                    />
                  ))}
                </>
              )}
              {showAllProducts && (
                <MainPage selectedItem={selectedItem} sessionId={sessionId} />
              )}
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
              onClick={() => {
                handleIconClick();
                setShowButtonsLayout(true);
              }}
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

      {/* Button outside the bordered box, positioned bottom-right */}

      {!showButtonsLayout && (
        <Box
          sx={{
            position: "absolute",
            bottom: "20px", // Position it slightly above the bottom
            right: showAllProducts
              ? isTablet
                ? "41%"
                : "36%"
              : isTablet
              ? "26%"
              : "17%", // Align it to the left of the bordered box
            zIndex: 1000,
          }}
        >
          <Button variant="contained" size="small" onClick={handleButtonClick}>
            {showAllProducts ? "View All Products" : "Configure"}
          </Button>
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
                  setShowButtonsLayout(false);
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: "20px", // Position it slightly above the bottom
                right: "120%",
                zIndex: 1000,
              }}
            >
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleButtonClick();
                  setShowButtonsLayout(false);
                }}
              >
                {showAllProducts ? "View All Products" : "Configure"}
              </Button>
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

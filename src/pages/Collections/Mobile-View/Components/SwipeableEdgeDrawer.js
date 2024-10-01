import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Slide,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  useGetExperienceDataById,
  useSetProductChangeCall,
} from "../../services";
import IframeResizer from "@iframe-resizer/react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WorkIcon from "@mui/icons-material/Work";
import AnimatedMenu from "./AnimatedMenu";
import io from "socket.io-client";
import useSocket from "../../../../hooks/useSocketMessages";

const AppContainer = (props) => (
  <Box
    sx={{
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      ...props.sx,
    }}
  >
    {props.children}
  </Box>
);

const ProductView = (props) => (
  <Box
    sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    }}
  >
    {props.children}
  </Box>
);

const ConfigureOptions = ({ onClose, isOptionsOpen, selectedItem }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "20vh",
        padding: "16px",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: isOptionsOpen ? "0vh" : "-30vh",
        left: "0",
        right: "0",
        zIndex: 1,
        transition: "bottom 0.3s ease",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle2">Selected Item</Typography>
        {selectedItem && ( // Conditionally render if selectedItem is present
          <Box>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <Typography variant="caption">{selectedItem.title}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  </Slide>
);

const ShowAllProductsOptions = ({ isOptionsOpen, items, onClose }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "20vh", // Drawer height set to 20% of the viewport height
        padding: "16px",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: isOptionsOpen ? "0vh" : "-30vh",
        left: "0",
        right: "0",
        zIndex: 1,
        transition: "bottom 0.3s ease",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle2">Bags</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            overflowY: "hidden",
            gap: "2px",
            marginTop: "4px",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {items?.map(({ image, title, isSelected, onClick }, index) => (
            <Box
              key={index}
              onClick={onClick}
              sx={{
                minWidth: "120px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "8px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  height: "50px",
                  width: "50px",
                  objectFit: "cover",
                  border: isSelected ? "2px solid #007AFF" : "none",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Urbanist",
                  color: isSelected ? "#007AFF" : "black",
                  marginTop: "8px",
                }}
              >
                {title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  </Slide>
);

const MobileDrawerApp = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isShowAll, setShowAll] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const { data } = useGetExperienceDataById();

  const { mutate: changeProductCall } = useSetProductChangeCall();

  const getData = data?.data;

  const experienceId = getData?.experience?.experience_id;
  const productKey = getData?.experience?.products[0]?.product_key;
  const canvasUrl = "http://64.227.170.212";
  const sessionId = getData?.sessionID;

  const url = `${canvasUrl}?experience=${experienceId}+&product=${productKey}+&session=${sessionId}`;
  const URL = "http://143.110.186.134";
  const socket = io(URL, { autoConnect: false });
  const { currProductKey, chapterList, currPlayMode, currActId, currItemId } =
    useSocket(socket);

  const handleToggleOptions = () => {
    setOptionsOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return newValue;
    });
  };

  const handleToggleDisplayComponent = () => {
    setIsDisplayComponent((prev) => !prev);
    setShowAll((prev) => !prev);
    setOptionsOpen(true);
  };

  const drawerHeight = "20vh";
  const productList = data?.data?.experience?.collection?.items;
  const initialCardItems = productList?.map((product) => {
    console.log("bb", product);
    const image = product.item_icons.find(
      (icon) => icon.file_type === "L"
    )?.path;
    return {
      image: image || "",
      title: product.item_display_short_title || "Untitled",
      product_id: product?.product?.product_id,
      product: product?.product,
      item_id: product?.item_id,
    };
  });

  console.log("bv", initialCardItems);

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
      console.log("sessionId on canvas", sessionId);
      socket.auth = { sessionId };
      socket.connect();
      setIsSocketConnected(true);
    }
  }, [sessionId]);

  const selectedItem =
    selectedIndex !== null
      ? [initialCardItems[selectedIndex]]
      : initialCardItems?.find((item) => item.item_id === currItemId)
      ? [initialCardItems?.find((item) => item.item_id === currItemId)]
      : [];

  console.log("selectedItem", selectedItem);

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
    <AppContainer>
      {/* Animated Menu on the left side */}
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 20,
        }}
      >
        <AnimatedMenu />
      </Box>

      <ProductView>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            position: "relative",
          }}
        >
          <IframeResizer
            id="one"
            src={url}
            scrolling="no"
            height="100%"
            width="100%"
          />

          {!isDisplayComponent && (
            <ConfigureOptions
              onClose={() => setOptionsOpen(false)}
              isOptionsOpen={isOptionsOpen}
              selectedItem={selectedItem[0]} // Pass the first item of selectedItem
            />
          )}

          {isDisplayComponent && (
            <ShowAllProductsOptions
              isOptionsOpen={isOptionsOpen}
              items={initialCardItems?.map((item, index) => ({
                image: item.image,
                title: item.title,
                isSelected: selectedIndex === index,
                onClick: () => {
                  setSelectedIndex(index);
                  setShowAll(false);
                  setOptionsOpen(true);
                },
              }))}
              onClose={() => setOptionsOpen(false)} // Pass onClose if needed
            />
          )}
        </Box>
      </ProductView>

      {/* Right-side Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: isOptionsOpen ? `calc(${drawerHeight} + 5vh)` : "6vh", // Dynamically positioned based on drawer height
          right: "2px", // Add some margin for better view on mobile
          color: "white",
          padding: "8px",
          zIndex: 12,
          cursor: "pointer",
        }}
      >
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={handleToggleDisplayComponent}
          size="small"
        >
          {isShowAll ? "Show All Products" : "Configure"}
        </Button>
      </Box>

      {/* Left-side Icons when Show All Products is active */}
      {isShowAll && (
        <Box
          sx={{
            position: "fixed",
            bottom: isOptionsOpen ? `calc(${drawerHeight} + 5vh)` : "6vh", // Dynamically positioned based on drawer height
            left: "2px", // Better padding for small screens
            padding: "8px",
            display: "flex",
            gap: "8px",
            zIndex: 12,
          }}
        >
          <LocalMallIcon />
          <WorkIcon />
        </Box>
      )}

      {/* Bottom Arrow Icon and Drawer Toggle */}
      <Box
        sx={{
          position: "fixed",
          // bottom: isOptionsOpen ? `calc(${drawerHeight} + 0px)` : "0px",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={handleToggleOptions}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </AppContainer>
  );
};

export default MobileDrawerApp;

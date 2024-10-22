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
  Tabs,
  Tab,
  styled,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  useGetExperienceDataById,
  useSetActionCall,
  useSetProductChangeCall,
} from "../../services";
import IframeResizer from "@iframe-resizer/react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WorkIcon from "@mui/icons-material/Work";
import AnimatedMenu from "./AnimatedMenu";
import io from "socket.io-client";
import useSocket from "../../../../hooks/useSocketMessages";

const AppContainer = styled(Box)((props) => ({
  position: "relative",
  height: "100vh",
  overflow: "hidden",
  ...props.sx,
}));

const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollbarWidth: "none", // For Firefox
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome/Safari
  },
  padding: theme.spacing(1),
}));

const VariantItem = styled(Box)(({ isSelected }) => ({
  border: isSelected ? "2px solid #007AFF" : "2px solid transparent",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "16px",
  transition: "border 0.3s ease",
}));

const ConfigureOptions = ({
  onClose,
  isOptionsOpen,
  selectedItem,
  sessionId,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const properties = selectedItem?.product?.property || [];

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { mutate: variantChange } = useSetActionCall();
  const productKey = selectedItem?.product?.product_key;

  const handleVariantChange = (propertyId, variant) => {
    const payload = {
      session_id: sessionId,
      message: {
        type: "change_variant",
        message: {
          product_key: productKey,
          property_id: propertyId,
          variant_id: variant?.variant_id,
        },
      },
    };

    variantChange(payload);
  };

  return (
    <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "40vh",
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

          {/* Tabs for properties */}
          <Tabs value={selectedTab} onChange={handleChange}>
            {properties.map((property, index) => (
              <Tab key={property.property_id} label={property.property_name} />
            ))}
          </Tabs>

          {/* Variants for selected tab */}
          {properties[selectedTab] && (
            <Box sx={{ marginTop: "16px" }}>
              <ScrollableContainer>
                {properties[selectedTab].variants.map((variant) => {
                  const variantIcon = variant.variant_icons.find(
                    (icon) => icon.file_type === "M"
                  );
                  return (
                    <VariantItem
                      key={variant?.variant_id}
                      isSelected={false}
                      onClick={() => {
                        handleVariantChange(
                          properties[selectedTab].property_id,
                          variant
                        );
                      }}
                    >
                      {variantIcon && (
                        <img
                          src={variantIcon.path}
                          alt={variant.variant_name}
                          style={{
                            // borderRadius: "50%",
                            height: "30px",
                            width: "30px",
                          }}
                        />
                      )}

                      <Typography variant="caption">
                        {selectedItem.title}
                      </Typography>
                    </VariantItem>
                  );
                })}
              </ScrollableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </Slide>
  );
};

const ShowAllProductsOptions = ({ isOptionsOpen, items, onClose }) => (
  <Slide direction="up" in={isOptionsOpen} mountOnEnter unmountOnExit>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "40vh", // Drawer height set to 20% of the viewport height
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

const MobileDrawerApp = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isShowAll, setShowAll] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [rotate, setRotate] = useState(false);
  const { data } = useGetExperienceDataById();
  const viewActionData = data?.data?.experience?.collection?.items?.[0]?.views;
  const collectionActionData = data?.data?.experience?.collection;
  const { mutate: changeProductCall } = useSetProductChangeCall();
  const { mutate: sendRotateCall } = useSetActionCall();
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

  const controlId = getData?.experience?.controls?.[0]?.control_id;

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
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
        <AnimatedMenu
          rotate={rotate}
          setRotate={setRotate}
          controlId={controlId}
          sessionId={sessionId}
          sendRotateCall={sendRotateCall}
        />
      </Box>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
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
              selectedItem={selectedItem[0]}
              sessionId={sessionId}
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
                  setShowAll(false); // Optionally close the "Show All" view
                  setOptionsOpen(true); // Open the ConfigureOptions component
                },
              }))}
              onClose={() => setOptionsOpen(false)} // Pass onClose if needed
            />
          )}
        </Box>
      </Box>

      {/* Right-side Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: isOptionsOpen ? `calc(${drawerHeight} + 10vh)` : "6vh", // Dynamically positioned based on drawer height
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
            bottom: isOptionsOpen ? `calc(${drawerHeight} + 10vh)` : "6vh", // Dynamically positioned based on drawer height
            left: "2px", // Better padding for small screens
            padding: "8px",
            display: "flex",
            gap: "8px",
            zIndex: 12,
          }}
        >
          <Views
            viewActionData={viewActionData}
            sessionId={sessionId}
            collectionActionData={collectionActionData}
          />
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

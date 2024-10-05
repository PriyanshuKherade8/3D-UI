import React, { useState } from "react";
import { useGetExperienceDataById, useSetActionCall } from "../services";
import { Box, Typography } from "@mui/material";
import IframeResizer from "@iframe-resizer/react";
import BottomDrawer from "../../../components/BottomDrawer";
import AnimatedMenu from "./Components/AnimatedMenu";

const MobileMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [isShowAll, setShowAll] = useState(false);

  const { data } = useGetExperienceDataById();
  const productList = data?.data?.experience?.collection?.items;
  console.log("productList", productList);

  const initialCardItems = productList?.map((product) => {
    console.log("bb", product);
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
        <BottomDrawer
          initialCardItems={initialCardItems}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          isDisplayComponent={isDisplayComponent}
          setIsDisplayComponent={setIsDisplayComponent}
          isOptionsOpen={isOptionsOpen}
          setOptionsOpen={setOptionsOpen}
          setShowAll={setShowAll}
          isShowAll={isShowAll}
        />
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

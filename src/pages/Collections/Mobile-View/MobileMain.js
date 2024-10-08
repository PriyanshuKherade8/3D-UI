import React, { useEffect, useState } from "react";
import { useGetExperienceDataById, useSetActionCall } from "../services";
import { Box, Typography } from "@mui/material";
import IframeResizer from "@iframe-resizer/react";
import BottomDrawer from "../../../components/BottomDrawer";
import AnimatedMenu from "./Components/AnimatedMenu";
import useSocket from "../../../hooks/useSocketMessages";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const MobileMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [isShowAll, setShowAll] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { id } = useParams();
  const { data } = useGetExperienceDataById(id);
  const productList = data?.data?.experience?.collection?.items;
  console.log("productList", productList);

  const initialCardItems = productList?.map((product) => {
    console.log("bb", product);
    const image = product.item_icons.find(
      (icon) => icon.file_type === "L"
    )?.path;
    return {
      image: image || "",
      title: product.item_display_short_title || "Untitled",
      long_title: product?.item_display_long_title,
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
  const URL = "http://143.110.186.134";
  const socket = io(URL, { autoConnect: false });
  const {
    currProductKey,
    chapterList,
    currPlayMode,
    currActId,
    currItemId,
    currVariant,
  } = useSocket(socket);
  console.log("currVariant", currVariant);
  const selectedItem =
    selectedIndex !== null
      ? [initialCardItems[selectedIndex]]
      : initialCardItems?.find((item) => item.item_id === currItemId)
      ? [initialCardItems?.find((item) => item.item_id === currItemId)]
      : [];

  const viewActionData = data?.data?.experience?.collection?.items?.[0]?.views;
  const collectionActionData = data?.data?.experience?.collection;

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
      console.log("sessionId on canvas", sessionId);
      socket.auth = { sessionId };
      socket.connect();
      setIsSocketConnected(true);
    }
  }, [sessionId]);

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
          handleToggleDisplayComponent={handleToggleDisplayComponent}
          sessionId={sessionId}
          selectedItem={selectedItem}
          collectionActionData={collectionActionData}
          viewActionData={viewActionData}
          currVariant={currVariant}
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

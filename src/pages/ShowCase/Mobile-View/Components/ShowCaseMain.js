import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import IframeResizer from "@iframe-resizer/react";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSetActionCall } from "../../../Collections/services";
import BottomDrawer from "../../../../components/BottomDrawer";
import AnimatedMenu from "../../../Collections/Mobile-View/Components/AnimatedMenu";
import useSocket from "../../../../hooks/useSocketMessages";
import StoryBottomDrawer from "../../../Story/StoryBottomDrawer";
import ShowCaseBottomDrawer from "./ShowCaseBottomDrawer";
import { useGetExperienceDataById } from "../../services";

const ShowCaseMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [isShowAll, setShowAll] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("100vh"); // New state for iframe height
  const { id } = useParams();
  const { data } = useGetExperienceDataById(id);

  const actList = data?.data?.experience?.act_list;
  const productList = data?.data?.experience?.products;

  const initialCardItems = productList?.map((product) => {
    return {
      product_key: product?.product_key,
      properties: product.property?.map((property) => {
        return {
          property_id: property?.property_id,
          property_name: property?.property_name,
          display_name: property?.display_name,
          property_type: property?.property_type,
          variants: property?.variants?.map((variant) => {
            const variantIconM = variant.variant_icons?.find(
              (icon) => icon.file_type === "M"
            );

            return {
              variant_id: variant?.variant_id,
              variant_name: variant?.variant_name,
              display_name: variant?.display_name,
              variant_icon_M: variantIconM ? variantIconM.path : "", // Extract M type icon path
            };
          }),
        };
      }),
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

  const selectedItem =
    initialCardItems && initialCardItems.length > 0 // Check if initialCardItems exists and is not empty
      ? selectedIndex !== null && selectedIndex < initialCardItems.length
        ? [initialCardItems[selectedIndex]] // Use item at selectedIndex if valid
        : initialCardItems.find((item) => item.item_id === currItemId)
        ? [initialCardItems.find((item) => item.item_id === currItemId)] // Use item found by currItemId
        : [initialCardItems[0]] // Fallback to the first item if no selection
      : []; // Return empty array if initialCardItems is undefined or empty

  const viewActionData = selectedItem;

  const collectionActionData = data?.data?.experience?.collection;

  useEffect(() => {
    if (!isSocketConnected && sessionId) {
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
        overflow: "hidden",
      }}
    >
      <IframeResizer
        id="iframe"
        src={url}
        scrolling="no"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: iframeHeight,
          transition: "height 0.3s ease",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <ShowCaseBottomDrawer
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
          setIframeHeight={setIframeHeight}
          actList={actList}
          currActId={currActId}
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

export default ShowCaseMain;

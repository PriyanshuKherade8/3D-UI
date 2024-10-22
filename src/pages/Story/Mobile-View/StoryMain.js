import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import IframeResizer from "@iframe-resizer/react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import {
  useGetExperienceDataById,
  useSetActionCall,
} from "../../Collections/services";
import StoryBottomDrawer from "../StoryBottomDrawer";
import AnimatedMenu from "../../Collections/Mobile-View/Components/AnimatedMenu";
import useSocket from "../../../hooks/useSocketMessages";
import { useGetExperienceDataByIdForStory } from "../services";

const StoryMain = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isDisplayComponent, setIsDisplayComponent] = useState(true);
  const [isShowAll, setShowAll] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("100vh"); // New state for iframe height
  const { id } = useParams();
  const { data } = useGetExperienceDataByIdForStory(id);
  const chapterListFromApi = data?.data?.experience?.chapter_list;

  const productList = data?.data?.experience?.collection?.items;

  const initialCardItems = productList?.map((product) => {
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
      views: product?.views,
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
    currMessage,
    playPause,
    playPauseToggle,
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

  const [matchedChapter, setMatchedChapter] = useState(null);

  useEffect(() => {
    // Function to match chapter_id
    const matchChapter = () => {
      // Get the current chapter_id from the WebSocket chapterList
      const currentChapterId = chapterList?.[0]?.chapter_id; // Assuming you want the first chapter
      // Find the corresponding chapter from the API data
      const matched = chapterListFromApi.find(
        (chapter) => chapter.chapter_id === currentChapterId
      );
      // Update the state with the matched chapter
      setMatchedChapter(matched);
    };

    // Match chapter when chapterList changes
    if (chapterList?.length > 0) {
      matchChapter();
    }
  }, [chapterList, chapterListFromApi]);

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
        <StoryBottomDrawer
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
          matchedChapter={matchedChapter}
          sendRotateCall={sendRotateCall}
          getData={getData}
          chapterList={chapterList}
          playPause={playPause}
          playPauseToggle={playPauseToggle}
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

export default StoryMain;

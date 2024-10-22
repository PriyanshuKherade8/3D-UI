import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box, Button } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useSetProductChangeCall } from "../../../Collections/services";
import MediaControlBar from "../../../Story/Mobile-View/Components/MediaControlBar";
import TabbedContent from "../../../Story/Desktop-View/Components/TabbedContent";
import Views from "../../../Collections/Mobile-View/Components/Views";
import TabsComponent from "./TabsComponent";
import ConfigureOptions from "./ConfigureOptions";

// Styled Components
const DrawerContainer = styled.div`
  position: relative;
  height: 30vh;
  //   border: 1px solid green;
`;

const Drawer = styled.div`
  position: fixed;
  bottom: -34vh;
  left: 0;
  right: 0;
  background: white;
  border-radius: 10px 10px 0 0;
  transition: bottom 0.3s ease;
  z-index: 20;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
    `};
`;

const DrawerContent = styled.div`
  padding: 6px;
  background: #f4f4f4;
  // border: 1px solid purple;
  height: 30vh;
`;

const SwipeableArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5vh;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  top: -9vh;
`;

const StyledButton = styled(Box)`
  border-radius: 25px;
  padding: 3px 20px;
  text-transform: none;
  font-weight: 650;
  font-size: 14px;
  color: #333333;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  background-color: white;
  height: ${({ isOpen }) => (isOpen ? "40px" : "30px")};
  width: auto;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
    border-color: #c1c1c1;
  }

  svg {
    margin-right: 10px;
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    text-align: left;
    flex-grow: 1;
  }
`;

const ShowCaseBottomDrawer = ({
  setSelectedIndex,
  initialCardItems,
  selectedIndex,
  isDisplayComponent,
  setOptionsOpen,
  isOptionsOpen,
  setShowAll,
  handleToggleDisplayComponent,
  isShowAll,
  sessionId,
  selectedItem,
  viewActionData,
  collectionActionData,
  currVariant,
  setIframeHeight, // New prop to control the iframe height
  matchedChapter,
  sendRotateCall,
  getData,
  chapterList,
  playPause,
  playPauseToggle,
  actList,
  currActId,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [startY, setStartY] = useState(0);
  const drawerRef = useRef(null);
  const { mutate: changeProductCall } = useSetProductChangeCall();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIframeHeight("80vh"); // Reduce iframe height when the drawer is open
    } else {
      document.body.style.overflow = "auto";
      setIframeHeight("100vh"); // Full height when the drawer is closed
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;

    if (isOpen && currentY > startY + 50) {
      setIsOpen(false);
    } else if (!isOpen && currentY < startY - 50) {
      setIsOpen(true);
    }
  };

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
    <>
      <DrawerContainer>
        {!isOpen && (
          <SwipeableArea
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onClick={toggleDrawer}
          >
            <ButtonContainer
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <Box
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "10px",
                }}
              >
                {isShowAll && (
                  <Views
                    viewActionData={viewActionData}
                    sessionId={sessionId}
                    collectionActionData={collectionActionData}
                  />
                )}
              </Box>
              <Box
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                }}
              >
                <StyledButton
                  variant="outlined"
                  onClick={handleToggleDisplayComponent}
                  size="small"
                >
                  {isShowAll ? (
                    <>
                      <ViewListIcon />
                      Explore Features
                    </>
                  ) : (
                    <>
                      <SettingsIcon />
                      Configure
                    </>
                  )}
                </StyledButton>
              </Box>
            </ButtonContainer>

            <HorizontalRuleIcon />
          </SwipeableArea>
        )}
        <Drawer
          isOpen={isOpen}
          ref={drawerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {isOpen === true && (
            <ButtonContainer
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <Box
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "10px",
                }}
              >
                {isShowAll && (
                  <Views
                    viewActionData={viewActionData}
                    sessionId={sessionId}
                    collectionActionData={collectionActionData}
                  />
                )}
              </Box>
              <Box
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                }}
              >
                <StyledButton
                  variant="outlined"
                  onClick={handleToggleDisplayComponent}
                  size="small"
                >
                  {isShowAll ? (
                    <>
                      <ViewListIcon />
                      Explore Features
                    </>
                  ) : (
                    <>
                      <SettingsIcon />
                      Configure
                    </>
                  )}
                </StyledButton>
              </Box>
            </ButtonContainer>
          )}
          <DrawerContent>
            <Box sx={{ width: "100%" }}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <HorizontalRuleIcon />
              </Box>

              {isDisplayComponent && (
                <Box>
                  <TabsComponent actList={actList} currActId={currActId} />
                </Box>
              )}

              {!isDisplayComponent && (
                <Box>
                  <ConfigureOptions
                    onClose={() => setOptionsOpen(false)}
                    isOptionsOpen={isOptionsOpen}
                    selectedItem={selectedItem[0]}
                    sessionId={sessionId}
                    currVariant={currVariant}
                  />
                </Box>
              )}
            </Box>
          </DrawerContent>
        </Drawer>
      </DrawerContainer>
    </>
  );
};

export default ShowCaseBottomDrawer;

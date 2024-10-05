import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box, Button } from "@mui/material";
import ItemCard from "../pages/Collections/Mobile-View/Components/ItemCard";
import ShowAllProductsOptions from "../pages/Collections/Mobile-View/Components/ShowAllProductsOptions";
import ConfigureOptions from "../pages/Collections/Mobile-View/Components/ConfigureOptions";
import Views from "../pages/Collections/Mobile-View/Components/Views";

const DrawerContainer = styled.div`
  position: relative;
  height: 20vh;
  overflow: hidden;
`;

const Drawer = styled.div`
  position: fixed;
  bottom: -200px;
  left: 0;
  right: 0;
  height: 200px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: bottom 0.3s ease;
  z-index: 20;

  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
    `}
`;

const DrawerContent = styled.div`
  padding: 16px;
`;

const SwipeableArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5vh;
  background: #e0e4e9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  top: -42px; /* Adjust position to be just above the drawer */
`;

const BottomDrawer = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
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
      setIsOpen(false); // Swiping down
    } else if (!isOpen && currentY < startY - 50) {
      setIsOpen(true); // Swiping up
    }
  };

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
                <Button
                  variant="contained"
                  onClick={handleToggleDisplayComponent}
                  size="small"
                >
                  {isShowAll ? "Show All Products" : "Configure"}
                </Button>
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
                <Button
                  variant="contained"
                  onClick={handleToggleDisplayComponent}
                  size="small"
                >
                  {isShowAll ? "Show All Products" : "Configure"}
                </Button>
              </Box>
            </ButtonContainer>
          )}
          <DrawerContent>
            <Box sx={{ width: "100%" }}>
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
                  onClose={() => setOptionsOpen(false)}
                />
              )}

              {!isDisplayComponent && (
                <ConfigureOptions
                  onClose={() => setOptionsOpen(false)}
                  isOptionsOpen={isOptionsOpen}
                  selectedItem={selectedItem[0]}
                  sessionId={sessionId}
                />
              )}
            </Box>
          </DrawerContent>
        </Drawer>
      </DrawerContainer>
    </>
  );
};

export default BottomDrawer;

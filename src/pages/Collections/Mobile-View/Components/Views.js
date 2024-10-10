import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useSetProductChangeCall } from "../../services";

const Views = ({ viewActionData, sessionId, collectionActionData }) => {
  const { mutate: changeViewCall } = useSetProductChangeCall();

  const defaultView = viewActionData?.find((view) => view.is_default) || null;

  const [selectedView, setSelectedView] = useState(
    defaultView ? defaultView.view_id : null
  );

  useEffect(() => {
    if (defaultView) {
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
            view_id: defaultView.view_id,
          },
        },
      };

      changeViewCall(viewPayload);
    }
  }, [defaultView, sessionId, collectionActionData]);

  const handleViewChange = (view) => {
    setSelectedView(view.view_id);

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

    console.log("Generated viewPayload:", viewPayload);
    changeViewCall(viewPayload);
  };

  return (
    <Box
      style={{
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
          padding: "1px 2px",
        }}
      >
        {viewActionData?.map((view) => {
          const largeIcon = view.view_icons.find(
            (icon) => icon.file_type === "L"
          );

          return (
            <Tooltip key={view.view_id} title={view.view_name || view.bag_name}>
              <IconButton
                key={view.view_id}
                onClick={() => handleViewChange(view)}
                sx={{
                  transition: "background-color 0.3s ease",
                  borderRadius: "8px",
                  backgroundColor:
                    selectedView === view.view_id
                      ? view.is_default
                        ? "white"
                        : "#007AFF"
                      : "transparent",
                  color: selectedView === view.view_id ? "#fff" : "#000",
                  "&:hover": {
                    backgroundColor:
                      selectedView === view.view_id ? "white" : "#e0e0e0",
                  },
                  marginLeft:
                    view.view_id !== viewActionData[0].view_id ? "0px" : 0,
                }}
              >
                <img
                  src={largeIcon.path}
                  alt={view.view_name || view.bag_name}
                  style={{
                    width: 20,
                    height: 20,
                    filter:
                      selectedView === view.view_id
                        ? "none"
                        : "grayscale(100%)",
                    transition: "filter 0.3s ease",
                  }}
                />
              </IconButton>
            </Tooltip>
          );
        })}
      </Paper>
    </Box>
  );
};

export default Views;

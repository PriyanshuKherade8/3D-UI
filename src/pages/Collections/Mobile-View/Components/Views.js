import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useSetProductChangeCall } from "../../services";

const Views = ({ viewActionData, sessionId, collectionActionData }) => {
  console.log("viewActionData", viewActionData, collectionActionData);

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

    console.log("Generated viewPayload:", viewPayload);

    changeViewCall(viewPayload);
  };

  return (
    <Box style={{ height: "36px" }}>
      <Paper
        elevation={3}
        sx={{ display: "flex", flexDirection: "row", height: "100%" }}
      >
        {/* Map through viewActionData to display the icons */}
        {viewActionData?.map((view) => {
          // Find the icon with file_type "L"
          const largeIcon = view.view_icons.find(
            (icon) => icon.file_type === "L"
          );
          return (
            <Tooltip key={view.view_id} title={view.view_name || view.bag_name}>
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
  );
};

export default Views;

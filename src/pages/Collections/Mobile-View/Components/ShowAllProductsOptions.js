import { Box, Typography } from "@mui/material";

const ShowAllProductsOptions = ({ isOptionsOpen, items, onClose }) => (
  console.log("items11", items),
  (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
        padding: "6px",
        backgroundColor: "#F4F4F4",
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
                width: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "4px",
                // backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  height: "100px",
                  width: "100px",
                  border: isSelected ? "1px solid #007AFF" : "none",
                  backgroundColor: isSelected ? "white" : "#F4F4F4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={title}
                  sx={{
                    height: "60px",
                    width: "50px",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box>
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
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
);

export default ShowAllProductsOptions;

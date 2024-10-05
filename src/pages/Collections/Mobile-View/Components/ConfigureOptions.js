import { Box, styled, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useSetActionCall } from "../../services";

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
  console.log("productKey", productKey);
  const handleVariantChange = (propertyId, variant) => {
    console.log("propertyId, variant", propertyId, variant);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
        padding: "16px",
        backgroundColor: "#F4F4F4",
        // position: "absolute",
        zIndex: 1,
        transition: "bottom 0.3s ease",
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography variant="subtitle2">{selectedItem?.title}</Typography>

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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {variantIcon && (
                        <img
                          src={variantIcon.path}
                          alt={variant.variant_name}
                          style={{
                            height: "30px",
                            width: "30px",
                          }}
                        />
                      )}

                      <Typography variant="caption" sx={{ marginTop: "8px" }}>
                        {selectedItem.title}
                      </Typography>
                    </Box>
                  </VariantItem>
                );
              })}
            </ScrollableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConfigureOptions;

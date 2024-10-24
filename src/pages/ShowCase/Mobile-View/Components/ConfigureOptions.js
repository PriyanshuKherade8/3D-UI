import { Box, styled, Tab, Tabs, Typography, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useSetActionCall } from "../../../Collections/services";

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
  currVariant,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  // Get properties from selectedItem directly
  const properties = selectedItem?.properties || [];

  useEffect(() => {
    if (currVariant?.variant_id) {
      setSelectedVariantId(currVariant.variant_id);
    } else if (properties.length > 0 && !selectedVariantId) {
      const firstVariant = properties[0]?.variants[0]?.variant_id;
      setSelectedVariantId(firstVariant);
    }
  }, [currVariant, properties, selectedVariantId]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { mutate: variantChange } = useSetActionCall();
  const productKey = selectedItem?.product_key;

  const handleVariantChange = (propertyId, variant) => {
    setSelectedVariantId(variant.variant_id);
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
        padding: "5px",
        backgroundColor: "#F4F4F4",
        zIndex: 1,
        transition: "bottom 0.3s ease",
      }}
    >
      <Box>
        <Box
          style={{
            fontWeight: "550",
            fontSize: "18px",
          }}
        >
          {selectedItem?.long_title}
        </Box>

        {/* Tabs for properties */}
        <Tabs value={selectedTab} onChange={handleChange}>
          {properties.map((property, index) => (
            <Tab
              key={property.property_id}
              label={property.property_name}
              style={{
                fontWeight: "550",
                textTransform: "capitalize",
                fontSize: "15px",
              }}
            />
          ))}
        </Tabs>

        {/* Variants for selected tab */}
        {properties[selectedTab] && (
          <Box>
            <ScrollableContainer>
              {properties[selectedTab].variants.map((variant) => {
                const variantIcon = variant?.variant_icon_M;

                return (
                  <VariantItem
                    key={variant?.variant_id}
                    // isSelected={variant?.variant_id === selectedVariantId}
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
                      <Box
                        style={{
                          width: "78px",
                          height: "78px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border:
                            variant?.variant_id === selectedVariantId
                              ? "1px solid #007AFF"
                              : "1px solid transparent",
                          borderRadius: "50%",
                        }}
                      >
                        {variantIcon && (
                          <img
                            src={variantIcon}
                            alt={variant.variant_name}
                            style={{
                              height: "62px",
                              width: "62px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </Box>

                      <Tooltip title={variant.variant_name}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "450",
                            fontFamily: "Urbanist !important",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: "100px", // Adjust width as needed for truncation
                            display: "flex",
                            justifyContent: "center",
                          }}
                          noWrap
                        >
                          {variant.display_name}
                        </Typography>
                      </Tooltip>
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

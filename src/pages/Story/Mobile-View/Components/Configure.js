import React, { useState, useEffect } from "react";
import { Box, styled, Tab, Tabs, Typography, Tooltip } from "@mui/material";
import { useSetActionCall } from "../../../Collections/services";

// Styles
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

const Configure = ({ getData, currVariant }) => {
  const productData = getData?.experience?.products || [];
  const sessionId = getData?.sessionID;

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  // Collect all properties from all products
  const allProperties = productData.reduce((acc, product) => {
    if (product?.property) {
      return [...acc, ...product.property];
    }
    return acc;
  }, []);

  useEffect(() => {
    if (currVariant?.variant_id) {
      setSelectedVariantId(currVariant.variant_id);
    } else if (allProperties.length > 0 && !selectedVariantId) {
      const firstVariant = allProperties[0]?.variants[0]?.variant_id;
      setSelectedVariantId(firstVariant);
    }
  }, [currVariant, allProperties, selectedVariantId]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const { mutate: variantChange } = useSetActionCall();
  const productKey = getData?.experience?.products?.[0]?.product_key;

  const handleVariantChange = (propertyId, variant) => {
    setSelectedVariantId(variant.variant_id);

    const payload = {
      session_id: sessionId,
      message: {
        type: "change_variant",
        message: {
          product_key: productKey, // Assuming each variant has a product_key
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
        {/* Tabs for properties */}
        <Tabs value={selectedTab} onChange={handleChange}>
          {allProperties.map((property, index) => (
            <Tab
              key={property?.property_id}
              label={property?.property_name} // Use property_name for the tab
              sx={{
                fontWeight: 550,
                textTransform: "capitalize",
                fontSize: "15px",
              }}
            />
          ))}
        </Tabs>

        {/* Variants for selected tab */}
        {allProperties[selectedTab] && (
          <ScrollableContainer>
            {allProperties[selectedTab].variants.map((variant) => {
              const variantIcon = variant.variant_icons.find(
                (icon) => icon.file_type === "M"
              );
              return (
                <VariantItem
                  key={variant?.variant_id}
                  onClick={() => {
                    handleVariantChange(
                      allProperties[selectedTab].property_id,
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
                      sx={{
                        width: "68px",
                        height: "68px",
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
                          src={variantIcon.path}
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
                      <Typography variant="caption" noWrap>
                        {variant?.display_name}
                      </Typography>
                    </Tooltip>
                  </Box>
                </VariantItem>
              );
            })}
          </ScrollableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Configure;

import React, { useState, useEffect } from "react";
import { Box, styled, Tab, Tabs, Typography, Tooltip } from "@mui/material";

// Mock Data
const mockSelectedItem = {
  long_title: "Sample Product",
  product: {
    property: [
      {
        property_id: "01",
        property_name: "Color",
        variants: [
          {
            variant_id: "VAR1001",
            variant_name: "Red",
            display_name: "Red",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/FF0000", // Mock image
              },
            ],
          },
          {
            variant_id: "VAR1002",
            variant_name: "Blue",
            display_name: "Blue",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/0000FF", // Mock image
              },
            ],
          },
          {
            variant_id: "VAR1003",
            variant_name: "Blue",
            display_name: "Blue",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/0000FF", // Mock image
              },
            ],
          },
          {
            variant_id: "VAR1004",
            variant_name: "Blue",
            display_name: "Blue",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/0000FF", // Mock image
              },
            ],
          },
          {
            variant_id: "VAR1005",
            variant_name: "Blue",
            display_name: "Blue",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/0000FF", // Mock image
              },
            ],
          },
        ],
      },
      {
        property_id: "02",
        property_name: "Size",
        variants: [
          {
            variant_id: "VAR2001",
            variant_name: "Small",
            display_name: "Small",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/FFFFFF", // Mock image
              },
            ],
          },
          {
            variant_id: "VAR2002",
            variant_name: "Large",
            display_name: "Large",
            variant_icons: [
              {
                file_type: "M",
                path: "https://via.placeholder.com/62/CCCCCC", // Mock image
              },
            ],
          },
        ],
      },
    ],
    product_key: "P10001",
  },
};

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

// Component
const Configure = ({ sessionId = "mockSession", currVariant = {} }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const selectedItem = mockSelectedItem;
  const properties = selectedItem?.product?.property || [];

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

  const handleVariantChange = (propertyId, variant) => {
    setSelectedVariantId(variant.variant_id);
    console.log("Selected Variant Change Payload:", {
      session_id: sessionId,
      message: {
        type: "change_variant",
        message: {
          product_key: selectedItem?.product?.product_key,
          property_id: propertyId,
          variant_id: variant?.variant_id,
        },
      },
    });
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
          {properties.map((property, index) => (
            <Tab
              key={property.property_id}
              label={property.property_name}
              sx={{
                fontWeight: 550,
                textTransform: "capitalize",
                fontSize: "15px",
              }}
            />
          ))}
        </Tabs>

        {/* Variants for selected tab */}
        {properties[selectedTab] && (
          <ScrollableContainer>
            {properties[selectedTab].variants.map((variant) => {
              const variantIcon = variant.variant_icons.find(
                (icon) => icon.file_type === "M"
              );
              return (
                <VariantItem
                  key={variant?.variant_id}
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
                      <Typography
                        variant="caption"
                        // sx={{
                        //   fontSize: "14px",
                        //   fontWeight: 450,
                        //   fontFamily: "Urbanist !important",
                        //   textOverflow: "ellipsis",
                        //   overflow: "hidden",
                        //   whiteSpace: "nowrap",
                        //   width: "100px",
                        //   display: "flex",
                        //   justifyContent: "center",
                        // }}
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
        )}
      </Box>
    </Box>
  );
};

export default Configure;

import React from "react";
import { Box } from "@mui/material";
import ExpandableGrid from "../../../../components/ExpandableGrid";

// Sample hardcoded data
const sampleData = [
  {
    product: {
      property: [
        {
          property_id: "1",
          property_name: "Color",
          variants: [
            {
              variant_id: "VAR001",
              variant_name: "Red",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/FF0000",
                },
              ],
              display_name: "Red Color",
            },
            {
              variant_id: "VAR002",
              variant_name: "Blue",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/0000FF",
                },
              ],
              display_name: "Blue Color",
            },
            {
              variant_id: "VAR003",
              variant_name: "Blue",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/0000FF",
                },
              ],
              display_name: "Blue Color",
            },
            {
              variant_id: "VAR004",
              variant_name: "Blue",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/0000FF",
                },
              ],
              display_name: "Blue Color",
            },
          ],
        },
        {
          property_id: "2",
          property_name: "Size",
          variants: [
            {
              variant_id: "VAR003",
              variant_name: "Small",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/CCCCCC",
                },
              ],
              display_name: "Small Size",
            },
            {
              variant_id: "VAR004",
              variant_name: "Large",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/666666",
                },
              ],
              display_name: "Large Size",
            },
            {
              variant_id: "VAR005",
              variant_name: "Large",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/666666",
                },
              ],
              display_name: "Large Size",
            },
            {
              variant_id: "VAR006",
              variant_name: "Large",
              variant_icons: [
                {
                  file_type: "L",
                  path: "https://via.placeholder.com/90/666666",
                },
              ],
              display_name: "Large Size",
            },
          ],
        },
      ],
      product_key: "P001",
    },
  },
];

const Configure = ({ sessionId }) => {
  // Use hardcoded data instead of props
  const selectedItem = sampleData;
  const propertySection = selectedItem?.[0]?.product?.property || [];

  // Dummy function to simulate variant change action
  const handleVariantChange = (propertyId, variant) => {
    const payload = {
      session_id: sessionId,
      message: {
        type: "change_variant",
        message: {
          product_key: selectedItem[0].product.product_key,
          property_id: propertyId,
          variant_id: variant.variant_id,
        },
      },
    };

    // Simulate variant change
    console.log("Variant changed:", payload);
  };

  return (
    <Box>
      {propertySection.map((property) => {
        const itemsData = property.variants.map((variant) => ({
          image:
            variant.variant_icons.find((icon) => icon.file_type === "L")
              ?.path || "",
          title: variant.variant_name,
          variant,
        }));

        return (
          <ExpandableGrid
            key={property.property_id}
            title={property.property_name}
            items={itemsData}
            itemPerRow={3}
            totalRows={1}
            displayImage={"circle"}
            onItemSelect={(selectedVariant) =>
              handleVariantChange(property.property_id, selectedVariant)
            }
          />
        );
      })}
    </Box>
  );
};

export default Configure;

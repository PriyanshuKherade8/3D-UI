import React from "react";
import ExpandableGrid from "../../../components/ExpandableGrid";
import { Box } from "@mui/material";
import { useSetActionCall } from "../services";

const MainPage = ({ selectedItem, sessionId }) => {
  const propertySection = selectedItem?.[0]?.product?.property || [];

  const { mutate: variantChange } = useSetActionCall();

  const propertyId = selectedItem?.[0]?.product?.property?.[0]?.property_id;
  const productKey = selectedItem?.[0]?.product?.product_key;

  const handleVariantChange = (propertyId, variant) => {
    const payload = {
      session_id: sessionId,
      message: {
        type: "change_variant",
        message: {
          product_key: productKey,
          property_id: propertyId,
          variant_id: variant.variant_id,
        },
      },
    };

    variantChange(payload);
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

export default MainPage;

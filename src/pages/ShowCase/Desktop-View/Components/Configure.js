import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSetActionCall } from "../../../Collections/services";
import ExpandableGrid from "../../../../components/ExpandableGrid";

const Configure = ({ getData, currVariant }) => {
  const productData = getData?.experience?.products || [];
  const sessionId = getData?.sessionID;

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

  const { mutate: variantChange } = useSetActionCall();
  const productKey = productData?.[0]?.product_key;

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

  const propertySection = productData?.[0]?.property || [];

  return (
    <Box>
      {propertySection?.map((property) => {
        const itemsData = property.variants?.map((variant) => ({
          image:
            variant.variant_icons.find((icon) => icon.file_type === "L")
              ?.path || "",
          title: variant.display_name,
          variant,
        }));

        // Select the item to be highlighted based on selectedVariantId or default to first item
        const selectedItem =
          itemsData.find(
            (item) => item.variant.variant_id === selectedVariantId
          ) || itemsData[0];

        return (
          <ExpandableGrid
            key={property.property_id}
            title={property.display_name}
            items={itemsData}
            itemPerRow={3}
            totalRows={1}
            displayImage={"circle"}
            onItemSelect={(selectedVariant) =>
              handleVariantChange(property.property_id, selectedVariant)
            }
            selectedItem={selectedItem} // Pass the selected item to the ExpandableGrid
          />
        );
      })}
    </Box>
  );
};

export default Configure;

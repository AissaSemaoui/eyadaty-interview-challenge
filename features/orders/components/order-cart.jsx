import React from "react";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";

import BasicTable from "@/components/ui/tables/basic-table";
import OrderDetails from "./order-details";

const OrderCart = ({ order = {} }) => {
  const formattedProducts = order?.products.map((product) =>
    createData(product)
  );

  return (
    <Card
      variant="elevation"
      sx={{
        flex: 2,
        height: "100%",
        maxWidth: "100%",
      }}
    >
      <CardHeader title="Cart" />
      <CardContent>
        <Stack gap={2}>
          <BasicTable columns={COLUMNS} rows={formattedProducts} />
          <OrderDetails order={order} />
        </Stack>
      </CardContent>
    </Card>
  );
};

const COLUMNS = [
  { id: "name", label: "Product" },
  { id: "variants", label: "Selected Variants" },
  { id: "venteType", label: "Vente Type" },
  { id: "price", label: "Price", align: "right" },
  { id: "quantity", label: "Quantity", align: "right" },
  { id: "total", label: "Total", align: "right" },
];

const createData = ({
  name,
  selectedVariations = {},
  detailPrice,
  grosPrice,
  venteType,
  quantity,
}) => {
  const variants = Object.values(selectedVariations).join(" ,") || "/";
  const price = venteType === "gros" ? grosPrice : detailPrice;
  const total = quantity * price;

  return {
    name,
    variants,
    venteType,
    price: `${price} DA`,
    quantity,
    total: `${total} DA`,
  };
};

export default OrderCart;

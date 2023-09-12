"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";

import { useGetSingleOrderQuery } from "@/features/orders/orders.api";
import OrderProgress from "@/features/orders/components/order-progress";
import OrderCart from "@/features/orders/components/order-cart";
import ClientProfile from "@/features/orders/components/client-profile";
import Loader from "@/components/ui/loader";

const OrderDetails = ({ params }) => {
  const { data, isLoading, isFetching, isError, error, isSuccess } =
    useGetSingleOrderQuery(params.orderId);

  if (isLoading || isFetching)
    return <Loader loadingText="Fetching order..." />;

  if (isError) throw new Error(error);

  return (
    <div>
      <Typography variant="h1" fontSize={32} marginBottom={4}>
        Order details
      </Typography>
      <Stack gap={2}>
        <OrderProgress
          stateHistory={data.commande?.stateHistory}
          currentState={data.commande?.currState}
          orderId={params.orderId}
        />
        <Stack
          flexDirection={{ sm: "column", md: "row" }}
          flexWrap="wrap"
          gap={2}
        >
          <OrderCart order={data.commande} />
          <ClientProfile client={data.commande?.client} />
        </Stack>
      </Stack>
    </div>
  );
};

export default OrderDetails;

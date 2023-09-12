"use client";

import React, { useEffect } from "react";

import moment from "moment";
import { Avatar, Chip, IconButton, Stack } from "@mui/material";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { useGetOrdersListQuery } from "../orders.api";
import PaginationTable from "@/components/ui/tables/pagination-table";
import { useOrders, useOrdersActions } from "@/hooks/useOrders";
import { BASE_API_URL } from "@/constants";
import Loader from "@/components/ui/loader";

export default function OrdersTable() {
  const [page, setPage] = React.useState(0);
  const orders = useOrders("orders");
  const { addOrders } = useOrdersActions();

  const { data, isError, isLoading, isFetching, isSuccess } =
    useGetOrdersListQuery(page + 1);

  useEffect(() => {
    if (isSuccess) {
      const rows = data.commandes.map((command) => createOrderRow(command));
      addOrders(rows);
    }
  }, [data]);

  if (isLoading || isFetching)
    return <Loader loadingText={"Fetching orders..."} />;

  if (isError) return <h1>We got an error here</h1>;

  const count = data.totalCount;

  return (
    <PaginationTable
      columns={ORDER_COLUMNS}
      rows={orders}
      count={count}
      page={page}
      setPage={setPage}
    />
  );
}

const createOrderRow = ({
  _id,
  cid,
  agentInfos,
  client,
  clientInfos,
  createdAt,
  currState,
  total,
}) => {
  return {
    id: _id,
    orderId: cid,
    client: { name: clientInfos?.fullName, photo: client?.photo },
    wilaya: clientInfos?.wilaya,
    status: currState?.title,
    agent: agentInfos?.fullName,
    createdAt: createdAt,
    total,
  };
};

const ORDER_COLUMNS = [
  { id: "orderId", label: "Order ID" },
  {
    id: "client",
    label: "Name",
    minWidth: "maxContent",
    format: ({ name, photo }) => (
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar src={`${BASE_API_URL}${photo}`} alt={name} />
        {name}
      </Stack>
    ),
  },
  {
    id: "wilaya",
    label: "Wilaya",
  },
  {
    id: "agent",
    label: "Agent",
  },
  {
    id: "createdAt",
    label: "Order date",
    format: (createdAt) => moment(createdAt).format("HH/mm/yy"),
  },
  {
    id: "status",
    label: "Status",
    format: (status) => {
      const color = {
        pending: "secondary",
        placed: "info",
        packed: "success",
        reserved: "warning",
      }[status];

      return (
        <Chip
          color={color}
          label={status.toUpperCase()}
          variant="outlined"
          sx={{ width: "100px" }}
        />
      );
    },
  },
  {
    id: "total",
    label: "Total",
    format: (total) => `${total} DA`,
  },
  {
    id: "id",
    label: "actions",
    format: (id) => (
      <Stack flexDirection="row" gap={1}>
        <IconButton LinkComponent={Link} href={`/orders/${id}`}>
          <EyeIcon />
        </IconButton>
        <RemoveOrderButton orderId={id} />
      </Stack>
    ),
  },
];

const RemoveOrderButton = ({ orderId }) => {
  const { removeOrder } = useOrdersActions();

  const handleRemoveOrder = () => {
    const confirmation = window.confirm(
      "Are you sure you wanna delete this order?!"
    );
    if (!confirmation) return;

    removeOrder(orderId);
  };

  return (
    <IconButton color="error" onClick={handleRemoveOrder}>
      <Trash2Icon />
    </IconButton>
  );
};

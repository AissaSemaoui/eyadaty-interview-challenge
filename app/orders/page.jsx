import { Typography } from "@mui/material";

import OrdersTable from "@/features/orders/components/orders-table";

export default function Orders() {
  return (
    <main>
      <Typography variant="h3" align="center" marginTop={16} marginBottom={8}>
        Orders List
      </Typography>
      <OrdersTable />
    </main>
  );
}

import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function OrderDetails({ order }) {
  const { agentInfos, paymentMode, subTotal, discount, total } = order;

  const agentInfosString = Object.values(agentInfos).join(", ");
  const paymentMethod = paymentMode[0]?.mode;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h2" fontSize={24} marginBottom={2}>
          Order details
        </Typography>
        <Stack>
          <PropertyText
            title="Agent"
            value={agentInfosString || "/"}
            currency={false}
          />
          <PropertyText
            title="Payment Method"
            value={paymentMethod || "/"}
            currency={false}
          />
          <PropertyText title="Sub Total" value={subTotal} />
          <PropertyText title="Discount" value={discount} />
          <Divider sx={{ marginBottom: "1rem" }} />
          <PropertyText title="Total" value={total} />
        </Stack>
      </CardContent>
    </Card>
  );
}

const PropertyText = ({ title, value, currency = true }) => (
  <Stack
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    marginBottom={1}
  >
    <Typography fontSize={14} textTransform="uppercase">
      {title} :
    </Typography>
    <Typography color="midnightblue">
      {value} {currency && "DA"}
    </Typography>
  </Stack>
);

export default OrderDetails;

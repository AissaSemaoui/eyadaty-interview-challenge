import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import { BASE_API_URL } from "@/constants";

function ClientProfile({ client }) {
  const {
    _id: id,
    photo,
    fullName,
    email,
    mobile1 = {},
    mobile2 = {},
    wilaya,
    commune,
    address,
  } = client;

  return (
    <Card sx={{ flex: 1, height: "100%", minWidth: "fit", maxWidth: "100%" }}>
      <CardHeader title="Client profile" />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ height: "80px", width: "80px", border: "1px solid" }}
          src={`${BASE_API_URL}${photo}`}
          alt={fullName}
        />
        <List sx={{ width: "100%" }}>
          <ListItem>
            <Typography fontWeight="bold" width="100%" textAlign="center">
              {fullName}
            </Typography>
          </ListItem>
          <ListItem>
            <PropertyText title="Email" content={email} />
          </ListItem>
          {mobile1.number && (
            <ListItem>
              <PropertyText title="Phone number 1" content={mobile1?.number} />
            </ListItem>
          )}
          {mobile2.number && (
            <ListItem>
              <PropertyText title="Phone number 2" content={mobile2?.number} />
            </ListItem>
          )}
          <ListItem>
            <PropertyText title="Wilaya" content={wilaya} />
          </ListItem>
          <ListItem>
            <PropertyText title="Commune" content={commune} />
          </ListItem>
          <ListItem>
            <PropertyText title="Address" content={address} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

const PropertyText = ({ title, content }) => (
  <Stack>
    <Typography color="GrayText" fontSize={14}>
      {title} :
    </Typography>
    <Typography>{content}</Typography>
  </Stack>
);

export default ClientProfile;

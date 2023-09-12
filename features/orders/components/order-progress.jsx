"use client";

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import moment from "moment";

import { STATUS } from "@/constants";
import { useUpdateOrderStatusMutation } from "../orders.api";

const OrderProgress = ({
  orderId = "",
  stateHistory = [],
  currentState = "",
}) => {
  const [currentStatus, setCurrentStatus] = useState(currentState.title);

  const [updateOrderStatus, { isLoading, isError, error, isSuccess, reset }] =
    useUpdateOrderStatusMutation();

  const handleChangeStatus = (event) => setCurrentStatus(event.target.value);

  const handleUpdateStatus = () =>
    updateOrderStatus({ orderId, newStatus: currentStatus });

  if (isError) console.error(error);

  if (isSuccess) {
    reset();
  }

  return (
    <Card variant="elevation">
      <CardHeader title="Order progress" />
      <CardContent>
        <Stepper
          sx={{ flexWrap: "wrap" }}
          alternativeLabel
          activeStep={stateHistory.length}
        >
          {stateHistory.map(({ state, date }) => {
            return (
              <Step key={date}>
                <StepLabel>
                  <Typography fontSize={16} textTransform="capitalize">
                    {state}
                  </Typography>
                  <Typography fontSize={14} color="GrayText">
                    {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardContent>
      <CardActions>
        <FormControl
          sx={{
            minWidth: "120px",
            display: "flex",
            gap: ".5rem",
          }}
        >
          <InputLabel id="update-order-status">Update order status</InputLabel>
          <Select
            placeholder="Change status"
            labelId="update-order-status"
            label="Update order status"
            value={currentStatus}
            onChange={handleChangeStatus}
            sx={{ textTransform: "capitalize" }}
          >
            {STATUS.map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{ textTransform: "capitalize" }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleUpdateStatus}
          sx={{
            marginLeft: "0.5rem",
          }}
        >
          Update
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default OrderProgress;

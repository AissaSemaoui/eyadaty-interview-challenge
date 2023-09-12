const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  orders: [],
  totalCount: 0,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ADD_ORDERS: (state, action) => {
      const newOrders = action.payload;
      if (!Array.isArray(newOrders) || newOrders.length < 1) return state;

      const filteredOrders = newOrders.filter(
        (nOrder) => !state.orders.find((order) => order.id === nOrder?.id)
      );

      state.orders.push(...filteredOrders);
      return state;
    },
    REMOVE_ORDER: (state, action) => {
      const orderId = action.payload;
      if (!orderId) return state;

      state.orders = state.orders.filter((order) => order.id !== orderId);

      return state;
    },
  },
});

export const { ADD_ORDERS, REMOVE_ORDER } = ordersSlice.actions;

export default ordersSlice.reducer;

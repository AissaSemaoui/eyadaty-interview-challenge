const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  value: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;

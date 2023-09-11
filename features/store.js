import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/features/api";
import ordersReducer from "@/features/orders/orders.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

import { api } from "@/features/api";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query({
      query: (pageNumber = 1) => `/commandes?p=${pageNumber}`,
    }),
    getSingleOrder: builder.query({
      query: (orderId) => `/commande/${orderId}`,
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ newStatus, orderId }) => ({
        url: `/commande/update/${orderId}`,
        method: "PATCH",
        body: {
          updatedFields: {
            state: newStatus,
          },
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersListQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;

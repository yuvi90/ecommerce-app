import { api } from "../../redux/api/api";
import { MessageResponse, NewOrderRequest } from "../../types/api-types";

export interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  customerName: string;
  customerUserName: string;
  shippingInfo: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  products: IProduct[];
  status: string;
  totalAmount: number;
}

export const orderAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "/api/order/new",
        method: "POST",
        body: order,
      }),
    }),

    userOrders: builder.query<{ status: string; orders: IOrder[] }, string>({
      query: (username) => `/api/order?user=${username}`,
    }),

    allOrders: builder.query<{ status: string; orders: IOrder[] }, void>({
      query: () => `/api/order/all`,
    }),

    updateOrder: builder.mutation<MessageResponse, { id: string; order: Partial<IOrder> }>({
      query: ({ id, order }) => ({
        url: `/api/order/${id}`,
        method: "PUT",
        body: order,
      }),
    }),

    deleteOrder: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUserOrdersQuery,
  useAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderAPI;

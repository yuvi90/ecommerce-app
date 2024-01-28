import { configureStore } from "@reduxjs/toolkit";
// API
import { productAPI } from "../features/products/productAPI";
// import { orderApi } from "../features/orders/orderAPI";
// import { dashboardApi } from "../features/dashboard/dashboardAPI";
// Reducer
import { authReducer } from "../features/auth";
import { api } from "./api/api";
// import { userReducer } from "../features/users/userReducer";
import { cartReducer } from "../features/cart/cartReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    // API
    [productAPI.reducerPath]: productAPI.reducer,
    [api.reducerPath]: api.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    // [dashboardApi.reducerPath]: dashboardApi.reducer,
    // Reducer
    [authReducer.name]: authReducer.reducer,
    // [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    productAPI.middleware,
    api.middleware,
    // orderApi.middleware,
    // dashboardApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

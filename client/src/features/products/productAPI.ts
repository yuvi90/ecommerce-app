import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SearchProductsResponse,
  SearchProductsRequest,
  ProductResponse,
  AllProductsResponse,
  CategoriesResponse,
} from "../../types/api-types";
// import {
//   AllProductsResponse,
//   CategoriesResponse,
//   DeleteProductRequest,
//   MessageResponse,
//   NewProductRequest,
//   ProductResponse,
//   SearchProductsRequest,
//   SearchProductsResponse,
//   UpdateProductRequest,
// } from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    allProducts: builder.query<AllProductsResponse, void>({
      query: () => "all",
      providesTags: ["product"],
    }),
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
      providesTags: ["product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    // latestProducts: builder.query<AllProductsResponse, string>({
    //   query: () => "latest",
    //   providesTags: ["product"],
    // }),
    // allProducts: builder.query<AllProductsResponse, string>({
    //   query: (id) => `admin-products?id=${id}`,
    //   providesTags: ["product"],
    // }),
    // newProduct: builder.mutation<MessageResponse, NewProductRequest>({
    //   query: ({ formData, id }) => ({
    //     url: `new?id=${id}`,
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["product"],
    // }),
    // updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
    //   query: ({ formData, userId, productId }) => ({
    //     url: `${productId}?id=${userId}`,
    //     method: "PUT",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["product"],
    // }),
    // deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
    //   query: ({ userId, productId }) => ({
    //     url: `${productId}?id=${userId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["product"],
    // }),
  }),
});

export const {
  useAllProductsQuery,
  useProductDetailsQuery,
  useSearchProductsQuery,
  // useLatestProductsQuery,
  // useCategoriesQuery,
  // useSearchProductsQuery,
  // useNewProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = productAPI;

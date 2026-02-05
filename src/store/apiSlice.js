import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({  limit = 12 }) => ({
        url: "/products",
        params: { limit },
      }),
      providesTags: ["Items"],
    }),
  }),
});

export const {
  useGetItemsQuery,
} = apiSlice;

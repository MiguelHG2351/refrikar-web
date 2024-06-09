import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const baseUrl = process.env.REACT_APP_API_BASE_URL

export const RefrikarApi = createApi({
  reducerPath: 'RefrikarApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    // prepareHeaders: (header) => {
    //   header.set('X-Api-Key', `${process.env.REACT_APP_API_KEY}`)
    //   header.set('Authorization', `Bearer ${getAuth()?.accessToken}`)
    //   return header
    // },
  }),
  endpoints: (build) => ({}),
  tagTypes: ['Cliente'],
})
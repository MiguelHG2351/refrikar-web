import {RefrikarApi} from "@/storage/api/refrikarApi";

export const productoApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuministros: builder.query({
      query: () => {
        return {
          url: '/api/suministros',
          method: 'GET'
        }
      }
    })
  })
})

// export const { useGetSuministrosQuery } = productoApi

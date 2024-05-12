import { RefrikarApi } from "./refrikarApi";

export const clientesApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => {
        return {
          url: '/api/clients',
          method: 'GET',
        }
      }
    })
  })
})

export const { useGetAllClientsQuery } = clientesApi
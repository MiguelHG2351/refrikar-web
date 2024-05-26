import { ClienteRequest } from "@/dtos/Cliente";
import { clienteAdapter, tipoClienteAdapter } from "./adapters/clientes";
import { RefrikarApi } from "./refrikarApi";

export const clientesApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => {
        return {
          url: '/api/clients',
          method: 'GET',
        }
      },
      transformResponse(data: any) {
        return clienteAdapter(data)
      },
    }),
    getAllTipoClients: builder.query({
      query: () => {
        return {
          url: '/api/tipo-clientes',
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        return tipoClienteAdapter(response)
      }
    }),
    addClient: builder.mutation({
      query: (client: ClienteRequest) => {
        return {
          url: '/api/clients',
          method: 'POST',
          body: client
        }
      }
    })
  })
})

export const { useGetAllClientsQuery, useGetAllTipoClientsQuery, useAddClientMutation } = clientesApi
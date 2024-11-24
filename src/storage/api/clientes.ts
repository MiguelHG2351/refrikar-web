import {ClienteCreateRequest, ClienteUpdateRequest} from "@/dtos/Cliente";
import { clienteAdapter, tipoClienteAdapter } from "./adapters/clientes";
import { RefrikarApi } from "./refrikarApi";

export const clientesApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: ({ search, tipo }) => {
        const searchParams = new URLSearchParams()
        if (search) {
          searchParams.set('search', search)
        }
        if (tipo) {
          searchParams.set('tipo', tipo)
        }

        return {
          url: `/api/clients?${searchParams.toString()}`,
          method: 'GET',
        }
      },
      transformResponse(data: any) {
        return clienteAdapter(data)
      },
      providesTags: ['Cliente']
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
      },
      providesTags: ['Cliente']
    }),
    addClient: builder.mutation({
      query: (client: ClienteCreateRequest) => {
        return {
          url: '/api/clients',
          method: 'POST',
          body: client
        }
      }
    }),
    editClient: builder.mutation({
      query: (client: ClienteUpdateRequest) => {
        return {
          url: '/api/clients',
          method: 'PUT',
          body: client
        }
      },
      invalidatesTags: ['Cliente']
    })
  })
})

export const {
  useGetAllClientsQuery,
  useGetAllTipoClientsQuery,
  useEditClientMutation, useAddClientMutation
} = clientesApi
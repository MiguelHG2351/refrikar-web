import { RefrikarApi } from "./refrikarApi";
import {tipoServicioAdapter} from "@/storage/api/adapters/servicio";

export const clientesApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: () => {
        return {
          url: '/api/service',
          method: 'POST',
        }
      }
    }),
    getTipoServicios: builder.query({
        query: () => {
            return {
              url: '/api/tipo-servicio',
              method: 'GET',
            }
        },
      transformResponse(response: any) {
        return tipoServicioAdapter(response)
      }
    })
  })
})

export const { useCreateServiceMutation, useGetTipoServiciosQuery } = clientesApi
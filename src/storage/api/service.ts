import { RefrikarApi } from "./refrikarApi";
import {tipoServicioAdapter} from "@/storage/api/adapters/servicio";

export const servicioApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data: any) => {
        return {
          url: '/api/services',
          method: 'POST',
          body: data
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

export const { useCreateServiceMutation, useGetTipoServiciosQuery } = servicioApi
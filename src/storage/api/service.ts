import { RefrikarApi } from "./refrikarApi";
import {servicioAdapter, tipoServicioAdapter} from "@/storage/api/adapters/servicio";

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
    getServicios: builder.query({
      query: (data: any) => {
        let apiPath = '/api/services'

        console.log('dfsadsfdasdsas ', data.cliente_id)
        if (data.cliente_id) {
          apiPath += `?cliente_id=${data.cliente_id}`
        }

        return {
          url:  apiPath,
          method: 'GET',
        }
      },
      transformResponse(response: any) {
        return servicioAdapter(response)
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

export const { useCreateServiceMutation, useGetTipoServiciosQuery, useGetServiciosQuery } = servicioApi
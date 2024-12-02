import { RefrikarApi } from "./refrikarApi";
import { equipoAdapter, tipoEquipoAdapter } from './adapters/equipo'

export const equipoApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getEquipos: builder.query({
      query: () => {
        return {
          url: '/api/equipo',
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        return equipoAdapter(response)
      }
    }),
    getTiposEquipos: builder.query({
      query: () => {
        return {
          url: '/api/tipo_equipo',
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        return tipoEquipoAdapter(response)
      }
    }),
  })
})

export const { useGetEquiposQuery, useGetTiposEquiposQuery } = equipoApi
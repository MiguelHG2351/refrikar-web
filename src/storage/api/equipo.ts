import { RefrikarApi } from "./refrikarApi";
import { equipoAdapter } from './adapters/equipo'

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
    })
  })
})

export const { useGetEquiposQuery } = equipoApi
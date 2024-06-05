import { RefrikarApi } from "./refrikarApi";
import { proveedoresAdapter } from './adapters/proveedores'

export const proveedoresApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getProveedores: builder.query({
      query: () => {
        return {
          url: '/api/proveedores',
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        return proveedoresAdapter(response)
      }
    })
  })
})

export const { useGetProveedoresQuery } = proveedoresApi
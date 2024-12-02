import { RefrikarApi } from "./refrikarApi";
import { proveedoresAdapter } from './adapters/proveedores'
import { ProveedoresEdit } from "@/dtos";

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
      },
      providesTags: ["proveedores"]
    }),
    actualizarProveedor: builder.mutation({
      query: (body:ProveedoresEdit)=>({
        method: "PUT",
        url: '/api/proveedores',
        body: body,
      }
      ),
      invalidatesTags: ["proveedores"]
    })
  })
 
})

export const { useGetProveedoresQuery,
  useActualizarProveedorMutation
 } = proveedoresApi
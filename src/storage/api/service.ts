import { RefrikarApi } from "./refrikarApi";

export const clientesApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: () => {
        return {
          url: '/api/service',
          method: 'POST',
        }
      }
    })
  })
})

const pruebaData = {
  service_id: 'SV0001',
  client_id: 'CL0001',
  service_details: 'Service details',
  detalles: [
    {
      detalle_id: 'DE0001',
      cantidad: 1,
      precio: 100,
      total: 100
    }
  ]
}

export const { useCreateServiceMutation } = clientesApi
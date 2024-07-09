import {RefrikarApi} from "@/storage/api/refrikarApi";
import {suministroAdapter} from "@/storage/api/adapters/suministroAdapter";

export const suministroApi = RefrikarApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuministros: builder.query({
      query: (data: any) => {
        let apiPath = '/api/suministro'

        if (data.cliente_id) {
          apiPath += `?cliente_id=${data.cliente_id}`
        }

        return {
          url:  apiPath,
          method: 'GET',
        }
      },
      transformResponse(response: any) {
        return suministroAdapter(response)
      }
    }),
  })
});

export const { useGetSuministrosQuery } = suministroApi;

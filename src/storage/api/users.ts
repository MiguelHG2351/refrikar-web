import {RefrikarApi} from "@/storage/api/refrikarApi";
import {userAdapter} from "@/storage/api/adapters/user";
import {UserEditRequest, UserRequest} from "@/dtos";

export const usersApi = RefrikarApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '/api/admin/user',
      transformResponse: (response: any[]) => userAdapter(response),
      providesTags: ['User']
    }),
    createUser: build.mutation({
      query: (body: UserRequest) => ({
        url: '/api/admin/user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User']
    }),
    editUser: build.mutation({
      query: (body: UserEditRequest) => ({
        url: '/api/admin/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User']
    }),
  }),
})

export const { useGetUsersQuery, useCreateUserMutation, useEditUserMutation } = usersApi;
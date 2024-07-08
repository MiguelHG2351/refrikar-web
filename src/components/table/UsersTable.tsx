'use client';

import {Protect, useOrganizationList, useUser} from "@clerk/nextjs";
import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {useGetUsersQuery} from "@/storage/api/users";
import {User} from "@/dtos";

const ROLES = {
  admin: 'Administrador',
  user: 'Usuario',
}

export default function UsersTable() {
  const { data: userList, isLoading, error, isError } = useGetUsersQuery('')
  if (isLoading) return <div className="flex-1 flex items-center justify-center">Cargando...</div>

  // @ts-ignore
  if(!isLoading && isError) return <div className="flex-1 flex items-center justify-center"><p>Error: {error.data?.message}</p></div>
  console.log(userList)
  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              Nombre
            </TableHeaderCell>
            <TableHeaderCell>
              Apellido
            </TableHeaderCell>
            <TableHeaderCell>
              Correo
            </TableHeaderCell>
            <TableHeaderCell>Se unió</TableHeaderCell>
            <TableHeaderCell>Rol</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {userList?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{ROLES[user.role]}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export const userMembershipsParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
};
export const UsersTableRender = () => {
  const { user } = useUser();
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: userMembershipsParams,
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Identificador</TableHeaderCell>
          <TableHeaderCell className="text-right">
            Org
          </TableHeaderCell>
          <TableHeaderCell>Joined</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {userMemberships?.data?.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell>{membership.id}</TableCell>
              <TableCell className="text-right">{membership.organization.name}</TableCell>
              <TableCell>{membership.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{membership.role}</TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

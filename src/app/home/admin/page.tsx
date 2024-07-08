import {Metadata} from "next";
import {Button} from "@nextui-org/react";
import UsersTable from "@/components/table/UsersTable";
import AddUserModal from "@/components/modals/AddUserModal";

export const metadata: Metadata = {
  title: 'Panel de administración de usuarios',
}

export default function Admin() {

  return (
      <section className="px-6 py-4 flex flex-col h-[calc(100%_-_59px)]">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">Panel de administración de usuarios</h2>
          <AddUserModal />
        </div>
        <UsersTable />
      </section>
  )
}
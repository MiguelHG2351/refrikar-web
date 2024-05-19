import Sidebar from '@/components/drawer-menu/Sidebar'
import AddServiceForm from '@/components/forms/addServices/Form'
import Image from 'next/image'
import React from 'react'

export default function AddService() {
  
  return (
    <section className="px-6 py-4">
      <h1 className="font-bold text-2xl">Agregar servicio</h1>
      
      <AddServiceForm />
    </section>
  )
}

import React from 'react'
import AddServiceForm from '@/components/forms/addServices/Form'

export const metadata = {
  title: 'Agregar servicio',
}

export default function AddService() {
  
  return (
    <section className="px-6 py-4">
      <h1 className="font-bold text-2xl">Agregar servicio</h1>
      
      <AddServiceForm />
    </section>
  )
}

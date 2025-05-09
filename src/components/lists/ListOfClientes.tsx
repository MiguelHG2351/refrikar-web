'use client';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
// import Sidebar from '../drawer-menu/Sidebar';

const ListOfClientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientType, setClientType] = useState('');
  const [clientes, setClientes] = useState([
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClientTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClientType(event.target.value);
  };

  const handleAddClient = () => {
    if (!clientType) {
      return;
    }
    const newClient = { id: clientes.length + 1, name: `Cliente ${clientes.length + 1} (${clientType})` };
    setClientes([...clientes, newClient]);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* <Sidebar /> */}
      <div style={{ marginBottom: '20px' }}>
        <Input
          type="text"
          placeholder="Buscar cliente"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '10px', width: 'calc(100% - 22px)', marginBottom: '10px' }}
        />
        <label>
          Seleccione tipo de cliente
          <select
            value={clientType}
            onChange={handleClientTypeChange}
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          >
            <option value="">Seleccionar tipo de cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.name}>
                {cliente.name}
              </option>
            ))}
          </select>
            
        </label>
        <Button
          onClick={handleAddClient}
          style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Agregar Cliente
        </Button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredClientes.map((cliente) => (
          <li key={cliente.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            {cliente.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfClientes;
import { render, screen, fireEvent } from '@testing-library/react';
import ListOfClientes from '@/components/lists/listOfClientes';

describe('ListOfClientes Component', () => {
  test('should render the initial list of clients', () => {
    render(<ListOfClientes />);

    const clientList = screen.getAllByRole('listitem');
    expect(clientList.length).toBe(3); // Initial clients
    expect(clientList[0].textContent).toBe('Cliente 1');
    expect(clientList[1].textContent).toBe('Cliente 2');
    expect(clientList[2].textContent).toBe('Cliente 3');
  });

  test('should filter clients based on search input', () => {
    render(<ListOfClientes />);

    const searchInput = screen.getByPlaceholderText('Buscar cliente');
    fireEvent.change(searchInput, { target: { value: 'Cliente 1' } });

    const clientList = screen.getAllByRole('listitem');
    expect(clientList.length).toBe(1); // Only one client matches the search
    expect(clientList[0].textContent).toBe('Cliente 1');
  });

  test('should add a client when type is selected', () => {
    render(<ListOfClientes />);

    const select = screen.getByText('Seleccionar tipo de cliente');
    fireEvent.change(select, { target: { value: 'tipo1' } });

    const addButton = screen.getByText('Agregar Cliente');
    fireEvent.click(addButton);

    const clientList = screen.getAllByRole('listitem');
    expect(clientList.length).toBe(4); // New client added
    expect(clientList[3].textContent).toContain('Cliente 4');
  });
});
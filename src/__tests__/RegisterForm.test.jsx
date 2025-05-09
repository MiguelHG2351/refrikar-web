import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "@/components/custom-forms/RegisterForm";

describe("RegisterForm", () => {
  it("renders the form with Correo and Contraseña fields and a submit button", () => {
    render(<RegisterForm onSubmit={jest.fn()} />);

    expect(
      screen.getByPlaceholderText("Ingrese su correo")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingrese su contraseña")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are left empty and form is submitted", async () => {
    render(<RegisterForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(
      await screen.findByText("El correo es obligatorio")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña es obligatoria")
    ).toBeInTheDocument();
  });

  it("calls onSubmit with form data when fields are valid", async () => {
    const mockOnSubmit = jest.fn();
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Ingrese su correo"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
      target: { value: "password123" },
    });

    // caso comun
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Wait for the form submission
    await screen.findByRole("button", { name: /iniciar sesión/i });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});

export interface Empleado {
  proveedorid: string;
  cedula: string;
  direccion: string;
  nombre: string;
  apellido: string;
  telefono: number;
  cargo_empleado: {
    cargoid: string;
    nombre: string;
  }
}
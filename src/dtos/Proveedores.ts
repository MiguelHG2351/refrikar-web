export interface Proveedores {
  proveedorid: string;
  nombre: string;
  apellido: string;
  telefono: number;
  direccion: string;
  ruc: string;
}

export interface ProveedoresEdit extends Partial<Proveedores>{

}
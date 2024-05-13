export interface Cliente {
  ruc: string;
  nombre: string;
  apellido: string;
  telefono: number;
  tipoclienteid: string;
  entidad: string;
}

export interface ClienteRequest {
  ruc?: string;
  nombre?: string;
  apellido?: string;
  telefono?: number;
  entidad?: string;
  tipoclienteid?: string;
}

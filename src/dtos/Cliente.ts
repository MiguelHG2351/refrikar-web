export interface Cliente {
  clienteid: string;
  ruc: string;
  nombre: string;
  apellido: string;
  telefono: number;
  tipo_cliente: {
    tipoclienteid: string;
    tipo_cliente: string;
  };
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

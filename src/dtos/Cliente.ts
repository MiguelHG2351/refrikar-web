export interface Cliente {
  clienteid: string;
  ruc: string;
  nombre: string;
  apellido: string;
  telefono: string;
  tipo_cliente: {
    tipoclienteid: string;
    tipo_cliente: string;
  };
  entidad: string;
}

export interface ClienteCreateRequest {
  ruc?: string;
  nombre: string;
  apellido?: string;
  telefono: string;
  entidad?: string;
  tipoclienteid?: string;
}

export interface ClienteUpdateRequest {
  clienteid: string;
  nombre?: string;
  apellido?: string;
  entidad?: string;
}

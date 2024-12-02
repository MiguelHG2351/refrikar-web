export interface Equipo {
  equipoid: string;
  tipoequipoid: string;
  capacidad: number;
  marca: string;
  numero_serie: string;
}

export interface TipoEquipo {
  tipoequipoid: string;
  tipo: string;
  descripcion?: string;
}

export interface TipoServicio {
  tiposervicioid: string;
  tipo: string;
  descripcion: string;
}

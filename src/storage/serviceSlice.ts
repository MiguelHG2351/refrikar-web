import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddServiceState {
  fechaFactura: string;
  numeroFactura: string;
  cliente: {
    clienteid?: string;
    ruc: string;
    nombre: string;
    apellido?: string;
    telefono: string;
    entidad?: string;
    isNew: boolean;
    addedFromModal: boolean;
    tipo_cliente: {
      tipo_clienteid: string;
      tipo_cliente: string;
    }
  },
  detalle_servicio: {
    costo: number;
    fecha: string;
    descripcion?: string;
    direccion: string;
    tiposervicioid?: string;
    equipoid?: string;
    equipo?: {
      tipo_equipo?: string;
      capacidad?: number;
      marca?: string;
      numero_serie?: string;
      tipo_servicio?: string;
    }
  }[]
}

const initialState: AddServiceState = {
  fechaFactura: '',
  numeroFactura: '',
  cliente: {
    clienteid: '',
    ruc: '',
    nombre: '',
    apellido: '',
    telefono: '',
    entidad: '',
    tipo_cliente: {
      tipo_clienteid: '',
      tipo_cliente: ''
    },
    isNew: true,
    addedFromModal: false
  },
  detalle_servicio: []
}

const addServiceSlice = createSlice({
  name: "addService",
  initialState,
  reducers: (create) => ({
    setDetalleServicio: create.reducer((state, action: PayloadAction<AddServiceState["detalle_servicio"][0]>) => {
      state.detalle_servicio.push(action.payload)
    }),
    setCliente: create.reducer((state, action: PayloadAction<AddServiceState["cliente"]>) => {
      state.cliente = action.payload
    }),
    clearCliente: create.reducer((state) => {
      state.cliente = initialState.cliente
    }),
    clearDetalleServicio: create.reducer((state) => {
      state.detalle_servicio = initialState.detalle_servicio
    }),

    // for individual fields
    setAddedFromModal: create.reducer((state, action: PayloadAction<boolean>) => {
      state.cliente.addedFromModal = action.payload
    }),
    setFechaFactura: create.reducer((state, action: PayloadAction<string>) => {
      state.fechaFactura = action.payload
    }),
    setRuc: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.ruc = action.payload
    }),
    setNombre: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.nombre = action.payload
    }),
    setApellido: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.apellido = action.payload
    }),
    setTelefono: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.telefono = action.payload
    }),
    setEntidad: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.entidad = action.payload
    }),
    // two field, for tipo client and tipo cliente id
    setTipoCliente: create.reducer((state, action: PayloadAction<{ tipo_cliente: string, tipo_clienteid: string }>) => {
      state.cliente.tipo_cliente.tipo_cliente = action.payload.tipo_cliente;
      state.cliente.tipo_cliente.tipo_clienteid = action.payload.tipo_clienteid;
    }),
    setTipoServicio: create.reducer((state, action: PayloadAction<string>) => {
      state.detalle_servicio[state.detalle_servicio.length - 1].tiposervicioid = action.payload
    }),
    setNumeroFactura: create.reducer((state, action: PayloadAction<string>) => {
      state.numeroFactura = action.payload
    }),
  })
});


// export const { openMenu, closeMenu } = menuSlice.actions
export const {
  setDetalleServicio,
  setCliente,
  clearCliente,
  clearDetalleServicio,
  setApellido,
  setEntidad,
  setFechaFactura,
  setNombre,
  setNumeroFactura,
  setRuc,
  setTelefono,
  setTipoCliente,
  setAddedFromModal,
} = addServiceSlice.actions
export default addServiceSlice.reducer

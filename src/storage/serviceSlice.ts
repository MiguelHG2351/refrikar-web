import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddServiceState {
  fechaFactura: string;
  fechaRegistro: string;
  numeroFactura: string;
  cliente: {
    clienteid?: string;
    ruc: string;
    nombre: string;
    apellido?: string;
    telefono: string;
    entidad: string;
    isNew: boolean;
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
    tiposervicioid: string;
    equipoid: string;
  }[]
}

const initialState: AddServiceState = {
  fechaFactura: '',
  fechaRegistro: '',
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
    isNew: true
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
    setFechaFactura: create.reducer((state, action: PayloadAction<string>) => {
      state.fechaFactura = action.payload
    }),
    setFechaRegistro: create.reducer((state, action: PayloadAction<string>) => {
      state.fechaRegistro = action.payload
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
    setTipoCliente: create.reducer((state, action: PayloadAction<string>) => {
      state.cliente.tipo_cliente.tipo_cliente = action.payload
    }),
    setNumeroFactura: create.reducer((state, action: PayloadAction<string>) => {
      state.numeroFactura = action.payload
    }),
  })
});


// export const { openMenu, closeMenu } = menuSlice.actions
export const { setDetalleServicio,
  setCliente,
  clearCliente,
  clearDetalleServicio,
  setApellido,
  setEntidad,
  setFechaFactura,
  setFechaRegistro,
  setNombre,
  setNumeroFactura,
  setRuc,
  setTelefono,
  setTipoCliente,
} = addServiceSlice.actions
export default addServiceSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddServiceState {
  cliente: {
    clienteid?: string;
    ruc: string;
    nombre: string;
    apellido?: string;
    telefono: number;
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
  cliente: {
    clienteid: '',
    ruc: '',
    nombre: '',
    apellido: '',
    telefono: 0,
    entidad: '',
    tipo_cliente: {
      tipo_clienteid: '',
      tipo_cliente: ''
    },
    isNew: false
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
    })
  })
});


// export const { openMenu, closeMenu } = menuSlice.actions
export const { setDetalleServicio, setCliente, clearCliente, clearDetalleServicio } = addServiceSlice.actions
export default addServiceSlice.reducer

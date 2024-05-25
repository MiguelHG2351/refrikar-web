import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddServiceState {
  cliente?: {
    clienteid?: string;
    ruc: string;
    nombre: string;
    apellido: string;
    telefono: string;
    entidad: string;
    isNew: boolean;
  },
  detalle_servicio: {
    costo: number;
    fecha: string;
    descripcion: string;
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
    telefono: '',
    entidad: '',
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
  })
});


// export const { openMenu, closeMenu } = menuSlice.actions
export const { setDetalleServicio } = addServiceSlice.actions
export default addServiceSlice.reducer

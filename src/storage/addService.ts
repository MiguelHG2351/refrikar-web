import { createSlice } from "@reduxjs/toolkit";

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
    costo: string;
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
  reducers: {
    setCliente(state, action) {
      state.cliente = action.payload
    },
    setDetalleServicio(state, action) {
      state.detalle_servicio = action.payload
    }
  }
});


// export const { openMenu, closeMenu } = menuSlice.actions
export default addServiceSlice.reducer

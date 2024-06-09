import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Cliente} from "@/dtos";
import {clientesApi} from "@/storage/api/clientes";

const initialState: Cliente[] = []

const clienteSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
        clientesApi.endpoints.getAllClients.matchFulfilled,
        (state, action) => {
          state = action.payload
        }
    )
  }
});


// export const {  } = menuSlice.actions
export default clienteSlice.reducer

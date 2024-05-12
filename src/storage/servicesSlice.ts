import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
interface MenuState {
  currentId: string;
}

const initialState: MenuState = {
  currentId: '',
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setId: (state) => {
      state.currentId = 'active';
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  }
});


export const { setId } = menuSlice.actions
export default menuSlice.reducer

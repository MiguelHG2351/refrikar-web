import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/storage/menuSlice";
import addServiceSlice from "@/storage/addService";
import { RefrikarApi } from "@/storage/api/refrikarApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menu: menuReducer,
      addService: addServiceSlice,
      [RefrikarApi.reducerPath]: RefrikarApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(RefrikarApi.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

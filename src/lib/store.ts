import { configureStore } from "@reduxjs/toolkit";
import { cvApi } from "./features/cv/cvApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [cvApi.reducerPath]: cvApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cvApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { configureStore } from "@reduxjs/toolkit";
import { cvApi } from "./features/cv/cvApi";

import { playerSlice } from "./features/player/playerSlice";
import { coachSlice } from "./features/coach/coachSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [cvApi.reducerPath]: cvApi.reducer,
      player: playerSlice.reducer,
      coach: coachSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cvApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

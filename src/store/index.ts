import { configureStore } from '@reduxjs/toolkit';
import mapImagesReducer from './mapImagesSlice';

const store = configureStore({
  reducer: {
    mapImages: mapImagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

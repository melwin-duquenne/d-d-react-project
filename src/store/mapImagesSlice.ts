import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MapImage {
  id: string;
  url: string;
  name: string;
}

interface MapImagesState {
  images: MapImage[];
}

function loadImagesFromStorage(): MapImage[] {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("mapImages");
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return [];
}

const initialState: MapImagesState = {
  images: loadImagesFromStorage(),
};

const mapImagesSlice = createSlice({
  name: 'mapImages',
  initialState,
  reducers: {
    addMapImage(state, action: PayloadAction<MapImage>) {
      state.images.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("mapImages", JSON.stringify(state.images));
      }
    },
    removeMapImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(img => img.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("mapImages", JSON.stringify(state.images));
      }
    },
    clearMapImages(state) {
      state.images = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("mapImages");
      }
    },
  },
});

export const { addMapImage, removeMapImage, clearMapImages } = mapImagesSlice.actions;
export default mapImagesSlice.reducer;

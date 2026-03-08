import { create } from "zustand";

export const useColorStore = create((set) => ({
  // Az alapértelmezett szín (pl. az eredeti csontszín/bézs)
  modelColor: "#ffecd6",
  setModelColor: (color) => set({ modelColor: color }),
}));

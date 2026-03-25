import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GeoItem } from "../model";

interface GeoItemsState {
  geoItems: GeoItem[];
  setGeoItems: (items: GeoItem[] | ((prev: GeoItem[]) => GeoItem[])) => void;
  addGeoItem: (item: GeoItem) => void;
  removeLastGeoItem: () => void;
  clearGeoItems: () => void;
}

export const useGeoItemsStore = create<GeoItemsState>()(
  persist(
    (set) => ({
      geoItems: [],
      setGeoItems: (items) =>
        set((state) => ({
          geoItems: typeof items === "function" ? items(state.geoItems) : items,
        })),
      addGeoItem: (item) =>
        set((state) => ({
          geoItems: [...state.geoItems, item],
        })),
      removeLastGeoItem: () =>
        set((state) => ({
          geoItems: state.geoItems.slice(0, -1),
        })),
      clearGeoItems: () => set({ geoItems: [] }),
    }),
    {
      name: "geo-markers",
    }
  )
);

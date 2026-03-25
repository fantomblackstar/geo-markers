import React, { FC } from "react";
import { AddMarkerButton } from "src/features/add-marker-button";
import { TrashIcon } from "lucide-react";
import { GeoItem } from "src/shared/model";
import { useGeoItemsStore } from "src/shared/lib";

export const MapTools: FC = () => {
  const geoItems = useGeoItemsStore((state) => state.geoItems);
  const clearGeoItems = useGeoItemsStore((state) => state.clearGeoItems);
  const removeLastGeoItem = useGeoItemsStore(
    (state) => state.removeLastGeoItem,
  );
  const addGeoItem = useGeoItemsStore((state) => state.addGeoItem);

  const onAddNewMarker = (marker: GeoItem) => {
    addGeoItem(marker);
  };

  return (
    <div className="flex gap-2 items-center absolute left-10 bottom-5 z-20">
      <button
        className="rounded  w-fit text-sm md:text-base px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
        type="button"
        onClick={clearGeoItems}
      >
        <TrashIcon className="mr-2" /> Все
      </button>
      <button
        className="rounded  w-fit text-sm md:text-base px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
        type="button"
        onClick={removeLastGeoItem}
      >
        <TrashIcon className="mr-2" /> Останній
      </button>
      <AddMarkerButton
        onSubmit={onAddNewMarker}
        markerIds={geoItems.map((item) => item.id)}
      />
    </div>
  );
};

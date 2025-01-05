import React from "react";
import { LayersControl } from "react-leaflet";
import { MapTileLayer } from "./map-tile-layer";

export const MapLayersControl: React.FC = () => {
  return (
    <LayersControl position="bottomright">
      <LayersControl.Overlay name="Street view" checked>
        <MapTileLayer />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Satellite view">
        <MapTileLayer view="satellite" />
      </LayersControl.Overlay>
    </LayersControl>
  );
};

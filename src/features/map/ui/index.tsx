import { MapContainer } from "react-leaflet";
import { MAP_POSITION, MAP_ZOOM } from "../lib";
import { MapLayersControl } from "./map-layers-control";
import { GeoItem } from "src/shared/model";
import { FC } from "react";
import { MapMarker } from "./map-marker";

type MapProps = {
  markers?: GeoItem[];
};

const Map: FC<MapProps> = ({ markers }) => {
  return (
    <MapContainer
      center={MAP_POSITION}
      zoom={MAP_ZOOM}
      className="w-full h-full"
    >
      <MapLayersControl />
      {markers?.map((marker) => (
        <MapMarker data={marker} key={`Marker-${marker.id}`} />
      ))}
    </MapContainer>
  );
};

export { Map };

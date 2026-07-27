import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import { GeoItem } from "src/shared/model";

type MapMarkerProps = {
  data: GeoItem;
};

const redCrossIcon = new DivIcon({
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round">
    <line x1="4" y1="4" x2="20" y2="20"/>
    <line x1="20" y1="4" x2="4" y2="20"/>
  </svg>`,
});

const MapMarker: FC<MapMarkerProps> = ({ data }) => {
  const { latitude, longitude, title, geoDescription } = data;

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <Marker position={[latitude, longitude]} icon={redCrossIcon}>
      <Popup className="text-base text-center">
        {geoDescription && (
          <p className="text-nowrap text-center">{geoDescription}</p>
        )}
        {title && <p className="text-nowrap font-bold text-center">{title}</p>}
        <p className="text-nowrap text-sm text-gray-500 text-justify">
          {latitude}, {longitude}
        </p>
      </Popup>
    </Marker>
  );
};

export { MapMarker };

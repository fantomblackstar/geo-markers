import { FC } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoItem } from "src/shared/model";

type MapMarkerProps = {
  data: GeoItem;
};

const MapMarker: FC<MapMarkerProps> = ({ data }) => {
  const { latitude, longitude, title, geoDescription, id } = data;
  const markerIcon = new Icon({
    iconSize: [25, 41],
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  });

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <Marker position={[latitude, longitude]} icon={markerIcon}>
      <Popup className="text-base text-center">
        {geoDescription && (
          <p className="text-nowrap text-center">{geoDescription}</p>
        )}
        {title && <p className="text-nowrap font-bold text-center">{title}</p>}
        <p className="text-nowrap text-sm text-gray-500 text-justify">
          {latitude}, {longitude}
        </p>
      </Popup>
      <Tooltip permanent direction="top" opacity={1}>
        <p className="border-2 text-base font-bold p-2">{id}</p>
      </Tooltip>
    </Marker>
  );
};

export { MapMarker };

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
      <Popup className="text-base">
        <p className="font-bold text-center">
          {latitude}, {longitude}
        </p>
        <p className="text-nowrap">{geoDescription}</p>
      </Popup>
      <Tooltip permanent direction="top" opacity={1}>
        <div className="border-2 text-base p-2">
          <span className="font-bold mr-1">{id}.</span>
          {title && <span>{title}</span>}
        </div>
      </Tooltip>
    </Marker>
  );
};

export { MapMarker };

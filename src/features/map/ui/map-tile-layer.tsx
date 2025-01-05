import { FC } from "react";
import { TileLayer } from "react-leaflet";
import {
  ATTRIBUTION_TILE_SATELLITE_LAYER,
  ATTRIBUTION_TILE_STREET_LAYER,
  TILE_SATELLITE_SUBDOMAINS,
  TILE_STREET_SUBDOMAINS,
  URL_TILE_SATELLITE_LAYER,
  URL_TILE_STREET_LAYER,
} from "../lib/constants";

type MapTileLayerProps = {
  view?: "street" | "satellite";
};

const MapTileLayer: FC<MapTileLayerProps> = ({ view = "street" }) => {
  const attribution =
    view === "street"
      ? ATTRIBUTION_TILE_STREET_LAYER
      : ATTRIBUTION_TILE_SATELLITE_LAYER;
  const url =
    view === "street" ? URL_TILE_STREET_LAYER : URL_TILE_SATELLITE_LAYER;
  const subdomains =
    view === "street" ? TILE_STREET_SUBDOMAINS : TILE_SATELLITE_SUBDOMAINS;

  return (
    <TileLayer attribution={attribution} url={url} subdomains={subdomains} />
  );
};

export { MapTileLayer };

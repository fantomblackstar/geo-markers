import { LatLngExpression } from "leaflet";

export const MAP_POSITION: LatLngExpression = [47.81457, 36.55893];
export const MAP_ZOOM = 10;

export const ATTRIBUTION_TILE_STREET_LAYER =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const URL_TILE_STREET_LAYER =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_STREET_SUBDOMAINS = ["a", "b", "c"];

export const ATTRIBUTION_TILE_SATELLITE_LAYER =
  '&copy; <a href="https://maps.google.com">Google Maps</a>';
export const URL_TILE_SATELLITE_LAYER =
  "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

export const TILE_SATELLITE_SUBDOMAINS = ["mt1", "mt2", "mt3"];

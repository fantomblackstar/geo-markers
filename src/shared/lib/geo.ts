import { MGRS } from "@ngageoint/mgrs-js";

export function parseLatLongFromGeoCode(geo: string): number[] {
  // Check if the geo code is in "lat long" format
  if (/^-?\d+(\.\d+)? -?\d+(\.\d+)?$/.test(geo)) {
    const [latitude, longitude] = geo.split(" ");
    return [+latitude, +longitude];
  }

  // Check if the geo code is in MGRS format
  if (
    /^\d{1,2}[A-Za-z]{1,3}\s*[A-Za-z]{0,3}\s*\d{1,10}\s*\d{1,10}$/.test(geo)
  ) {
    const mgrs = MGRS.parse(geo);
    const point = mgrs.toPoint();

    return [point.getLatitude(), point.getLongitude()];
  }

  return [0, 0];
}

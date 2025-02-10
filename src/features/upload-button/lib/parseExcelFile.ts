import { GeoItem } from "src/shared/model";
import * as XLSX from "xlsx";
import { MGRS } from "@ngageoint/mgrs-js";

function parseLatLongFromGeoCode(geo: string): number[] {
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

export async function parseExcelFile(file: File | Buffer): Promise<GeoItem[]> {
  return await new Promise((resolve) => {
    try {
      const reader = new FileReader();
      if (file instanceof File) {
        reader.onload = (event) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.SheetNames[0];
          const sheetData: string[] = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet],
            {
              header: 1,
            }
          );

          const geoItems: GeoItem[] = sheetData
            .filter((item) => item && item.length >= 2)
            .map((item: any, index: number) => {
              const [id = index + 1, geo, geoDescription, title] = item;
              const [latitude, longitude] = parseLatLongFromGeoCode(geo);
              return {
                id: id.toString(),
                latitude,
                longitude,
                geoDescription,
                title,
              };
            });

          console.log("geoItems", geoItems);
          resolve(geoItems);
        };
        reader.readAsArrayBuffer(file);
        reader.onerror = () => {
          console.error("Error reading file");
        };
      }
    } catch (error) {
      console.error(error);
      resolve([]);
    }
  });
}

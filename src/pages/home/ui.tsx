import { GeoItem } from "src/shared/model";
import { Map } from "../../features/map";
import { Header } from "src/features/header";
import { UploadButton } from "src/features/upload-button";
import { useState } from "react";

export const Home = () => {
  const [geoItems, setGeoItems] = useState<GeoItem[]>([]);

  return (
    <section className="relative w-full h-screen flex flex-col">
      <Header>
        <UploadButton onGeoItemsParse={setGeoItems} />
      </Header>
      <div className="h-auto grow">
        <Map markers={geoItems} />
      </div>
    </section>
  );
};

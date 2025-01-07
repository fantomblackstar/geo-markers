import { GeoItem } from "src/shared/model";
import { Map } from "../../features/map";
import { Header } from "src/features/header";
import { UploadButton } from "src/features/upload-button";
import { useState } from "react";

export const Home = () => {
  const [geoItems, setGeoItems] = useState<GeoItem[]>([]);

  const onResetItemsClick = () => setGeoItems([]);

  return (
    <section className="relative w-full h-screen flex flex-col">
      <Header bodyClassName="flex justify-between">
        <UploadButton onGeoItemsParse={setGeoItems} />
        <button
          className="rounded px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
          type="button"
          onClick={onResetItemsClick}
        >
          Очистити все
        </button>
      </Header>
      <div className="h-auto grow">
        <Map markers={geoItems} />
      </div>
    </section>
  );
};

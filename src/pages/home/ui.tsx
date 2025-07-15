import { GeoItem } from "src/shared/model";
import { Map } from "../../features/map";
import { Header } from "src/features/header";
import { UploadButton } from "src/features/upload-button";
import { useState } from "react";
import { UploadTipIcon } from "src/features/upload-tip-icon";
import { AddMarkerButton } from "src/features/add-marker-button";

export const Home = () => {
  const [geoItems, setGeoItems] = useState<GeoItem[]>([]);

  const onResetItemsClick = () => setGeoItems([]);

  const onAddNewMarker = (marker: GeoItem) => {
    setGeoItems((prev) => [...prev, marker]);
  };

  const renderHeaderBody = () => {
    return (
      <>
        <div className="flex gap-2 items-center">
          <UploadButton onGeoItemsParse={setGeoItems} />
          <UploadTipIcon />
        </div>
        <div className="flex gap-2 items-center ml-auto">
          <button
            className="rounded  w-fit text-sm md:text-base px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
            type="button"
            onClick={onResetItemsClick}
          >
            Очистити все
          </button>
          <AddMarkerButton
            onSubmit={onAddNewMarker}
            markerIds={geoItems.map((item) => item.id)}
          />
        </div>
      </>
    );
  };

  return (
    <section className="relative w-full h-screen flex flex-col">
      <Header bodyClassName="flex justify-start flex-col md:flex-row gap-2">
        {renderHeaderBody()}
      </Header>
      <div className="h-auto grow md:mt-14 mt-[100px]">
        <Map markers={geoItems} />
      </div>
    </section>
  );
};

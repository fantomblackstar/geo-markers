import { Map } from "../../features/map";
import { Header } from "src/features/header";
import { MapTools } from "./map-tools";
import { useGeoItemsStore } from "src/shared/lib";

export const Home = () => {
  const geoItems = useGeoItemsStore((state) => state.geoItems);

  return (
    <section className="relative w-full h-screen flex flex-col">
      <Header />
      <div className="h-auto grow md:mt-14 mt-[100px] relative">
        <Map markers={geoItems} />
        <MapTools />
      </div>
    </section>
  );
};

import { GeoItem } from "src/shared/model";
import { Map } from "../../features/map";

export const Home = () => {
  const geoItems: GeoItem[] = [
    {
      id: "1",
      latitude: 47.81457,
      longitude: 36.55893,
      title: "test eer34",
      geoDescription: "testerre erreefdf fdf",
    },
  ];

  return (
    <section className="relative w-full h-screen">
      <Map markers={geoItems} />
    </section>
  );
};

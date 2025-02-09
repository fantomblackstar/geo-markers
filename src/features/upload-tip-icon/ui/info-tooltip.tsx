import React from "react";
import { Tooltip } from "react-tooltip";
import ExampleImg from "./file-example.png";

export const InfoTooltip: React.FC = () => {
  return (
    <Tooltip id="upload-tooltip" style={{ backgroundColor: "white" }}>
      <p className="mb-1 text-indigo-950 text-lg lg:text-xl max-w-xs text-wrap">
        Підтримуються такі типи координат:
        <br />
        - широта, довгота
        <br />
        - mgrs
        <br />
        Приклад коректного файлу Excel показано нижче:
      </p>
      <img
        src={ExampleImg}
        className="max-w-[330px] lg:max-w-3xl xl:max-w-4xl h-auto"
      />
    </Tooltip>
  );
};

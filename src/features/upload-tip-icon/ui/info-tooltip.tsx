import React from "react";
import { Tooltip } from "react-tooltip";
import ExampleImg from "./file-example.png";

export const InfoTooltip: React.FC = () => {
  return (
    <Tooltip id="upload-tooltip" style={{ backgroundColor: "white" }}>
      <p className="mb-1 text-indigo-950 text-lg lg:text-xl">
        Приклад коректного файлу Excel показано нижче:
      </p>
      <img src={ExampleImg} className="max-w-[330px] lg:max-w-2xl h-auto" />
    </Tooltip>
  );
};

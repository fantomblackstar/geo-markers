import React from "react";
import { Info } from "lucide-react";
import { InfoTooltip } from "./info-tooltip";

export const UploadTipIcon: React.FC = () => {
  return (
    <>
      <Info
        data-tooltip-id="upload-tooltip"
        className="size-7 cursor-pointer text-blue-800"
      />
      <InfoTooltip />
    </>
  );
};

import React from "react";
import { InfoIcon } from "./info-icon";
import { InfoTooltip } from "./info-tooltip";

export const UploadTipIcon: React.FC = () => {
  return (
    <>
      <InfoIcon
        data-tooltip-id="upload-tooltip"
        className="size-7 cursor-pointer"
      />
      <InfoTooltip />
    </>
  );
};

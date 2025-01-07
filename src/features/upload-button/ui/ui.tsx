import React, { Dispatch, SetStateAction, useRef } from "react";
import { UploadIcon } from "./upload-icon";
import { parseExcelFile } from "../lib";
import { GeoItem } from "src/shared/model";

type UploadButtonProps = {
  onGeoItemsParse: Dispatch<SetStateAction<GeoItem[]>>;
};
export const UploadButton: React.FC<UploadButtonProps> = ({
  onGeoItemsParse,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await parseExcelFile(file);
      onGeoItemsParse(data);
    }
  };

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  return (
    <>
      <button
        className="rounded px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
        type="button"
        onClick={handleButtonClick}
      >
        <UploadIcon className="mr-2" />
        <span className="text-sm md:text-base">Завантажити координати</span>
      </button>
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        onClick={onInputClick}
      />
    </>
  );
};

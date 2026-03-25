import React from "react";
import { twMerge } from "tailwind-merge";
import { UploadButton } from "src/features/upload-button";
import { UploadTipIcon } from "src/features/upload-tip-icon";
import { useGeoItemsStore } from "src/shared/lib";

type HeaderProps = {
  className?: string;
  bodyClassName?: string;
};

export const Header: React.FC<HeaderProps> = ({ className, bodyClassName }) => {
  const setGeoItems = useGeoItemsStore((state) => state.setGeoItems);

  return (
    <header
      className={twMerge(
        "fixed left-0 top-0 w-full px-0 py-2 bg-blue-500 shrink-0 z-50",
        className,
      )}
    >
      <div
        className={twMerge(
          "container flex justify-start md:justify-between flex-wrap gap-2",
          bodyClassName,
        )}
      >
        <div className="flex flex-0 gap-2 items-center">
          <UploadButton onGeoItemsParse={setGeoItems} />
          <UploadTipIcon />
        </div>
      </div>
    </header>
  );
};

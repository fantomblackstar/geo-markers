import { FC, useState } from "react";
import { NewMarkerDialog } from "./new-marker-dialog";
import { GeoItem } from "src/shared/model";
import { MapPinPlus } from "lucide-react";
import { useMedia } from "src/shared/lib";

interface AddMarkerButtonProps {
  onSubmit: (marker: GeoItem) => void;
  markerIds: string[];
}

const AddMarkerButton: FC<AddMarkerButtonProps> = ({ onSubmit, markerIds }) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useMedia();

  const onToggleDialog = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="rounded px-4 py-2 bg-indigo-900 text-white flex hover:bg-indigo-800 active:bg-indigo-600"
        type="button"
        onClick={onToggleDialog}
      >
        <MapPinPlus className="mr-2" />
        {!isMobile && "Додати маркер"}
      </button>
      <NewMarkerDialog
        open={open}
        onOpenChange={onToggleDialog}
        onSubmit={onSubmit}
        markerIds={markerIds}
      />
    </>
  );
};

export { AddMarkerButton };

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { GeoItem } from "src/shared/model";
import { parseLatLongFromGeoCode } from "src/shared/lib";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "src/shared/ui/dialog";

type CoordinateType = "latlng" | "mgrs";

interface FormValues {
  id: string;
  title: string;
  geoDescription: string;
  latitude?: string;
  longitude?: string;
  mgrs?: string;
}

interface NewMarkerDialogProps {
  open: boolean;
  onOpenChange: (open?: boolean) => void;
  onSubmit: (marker: GeoItem) => void;
  markerIds: string[];
}

export const NewMarkerDialog: FC<NewMarkerDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  markerIds,
}) => {
  const [coordinateType, setCoordinateType] =
    useState<CoordinateType>("latlng");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const handleFormSubmit = (data: FormValues) => {
    let latitude = 0;
    let longitude = 0;

    if (coordinateType === "latlng") {
      latitude = Number(data.latitude);
      longitude = Number(data.longitude);
    } else if (coordinateType === "mgrs" && data.mgrs) {
      const [lat, lng] = parseLatLongFromGeoCode(data.mgrs);
      latitude = lat;
      longitude = lng;
    }

    onSubmit({
      id: data.id,
      title: data.title,
      geoDescription: data.geoDescription,
      latitude,
      longitude,
    });

    reset();
    onOpenChange(false);
  };

  const renderCoordinatesInput = () => {
    return (
      <>
        {coordinateType === "latlng" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Широта</label>
              <input
                {...register("latitude", {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: "Невірний формат широти",
                  },
                })}
                className="w-full p-2 border rounded"
                placeholder="напр. 51.5074"
              />
              {errors.latitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Довгота</label>
              <input
                {...register("longitude", {
                  required: "Обов'язкове поле",
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: "Невірний формат довготи",
                  },
                })}
                className="w-full p-2 border rounded"
                placeholder="напр. -0.1278"
              />
              {errors.longitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">MGRS</label>
            <input
              {...register("mgrs", { required: "Обов'язкове поле" })}
              className="w-full p-2 border rounded"
              placeholder="напр. 33UXP0000000000"
            />
            {errors.mgrs && (
              <p className="text-red-500 text-xs mt-1">{errors.mgrs.message}</p>
            )}
          </div>
        )}
      </>
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Додати новий маркер</DialogTitle>
          <DialogDescription>
            Заповніть деталі, щоб додати новий маркер на карту.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="coordinateType"
                  value="latlng"
                  checked={coordinateType === "latlng"}
                  onChange={() => setCoordinateType("latlng")}
                  className="h-4 w-4"
                />
                Широта/Довгота
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="coordinateType"
                  value="mgrs"
                  checked={coordinateType === "mgrs"}
                  onChange={() => setCoordinateType("mgrs")}
                  className="h-4 w-4"
                />
                MGRS
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input
                {...register("id", {
                  required: "Обов'язкове поле",
                  validate: (value) =>
                    !markerIds.includes(value) || "Цей ID вже існує",
                })}
                className="w-full p-2 border rounded"
                placeholder="Введіть ID маркера"
              />
              {errors.id && (
                <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>
              )}
            </div>
            {renderCoordinatesInput()}

            <div>
              <label className="block text-sm font-medium mb-1">Назва</label>
              <input
                {...register("title", { required: "Обов'язкове поле" })}
                className="w-full p-2 border rounded"
                placeholder="Введіть назву маркера"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Гео опис</label>
              <input
                {...register("geoDescription", {
                  required: "Обов'язкове поле",
                })}
                className="w-full p-2 border rounded"
                placeholder="Введіть гео опис"
              />
              {errors.geoDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.geoDescription.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border rounded mr-2"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Додати маркер
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

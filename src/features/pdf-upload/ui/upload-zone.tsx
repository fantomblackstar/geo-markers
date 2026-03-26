import { DragEvent } from "react";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";

interface UploadZoneProps {
  isDragging: boolean;
  isLoading: boolean;
  status: "idle" | "success" | "error";
  errorMessage: string;
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onReset: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadZone = ({
  isDragging,
  isLoading,
  status,
  errorMessage,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  onReset,
  fileInputRef,
  onFileChange,
}: UploadZoneProps) => {
  return (
    <div
      onClick={onClick}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-white"
        }
        ${isLoading ? "pointer-events-none opacity-60" : ""}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={onFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        ) : status === "success" ? (
          <CheckCircle className="w-12 h-12 text-green-500" />
        ) : status === "error" ? (
          <XCircle className="w-12 h-12 text-red-500" />
        ) : (
          <Upload className="w-12 h-12 text-gray-400" />
        )}

        <div>
          {isLoading ? (
            <p className="text-lg font-medium text-gray-700">Обробка PDF...</p>
          ) : status === "error" ? (
            <>
              <p className="text-lg font-medium text-red-600">
                Помилка обробки PDF
              </p>
              <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700">
                Перетягніть PDF файл сюди або натисніть для вибору
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Підтримуються тільки PDF файли
              </p>
            </>
          )}
        </div>

        {!isLoading && status === "error" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Завантажити інший
          </button>
        )}
      </div>
    </div>
  );
};

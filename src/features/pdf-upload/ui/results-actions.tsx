import { Download, MapPin } from "lucide-react";

interface ResultsActionsProps {
  onExportCSV: () => void;
  onAddToMap: () => void;
  onReset: () => void;
}

export const ResultsActions = ({
  onExportCSV,
  onAddToMap,
  onReset,
}: ResultsActionsProps) => {
  return (
    <>
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
        <button
          onClick={onExportCSV}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Експортувати CSV
        </button>
        <button
          onClick={onAddToMap}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <MapPin className="w-4 h-4" />
          Додати на карту
        </button>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-3 text-center">
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Завантажити інший файл
        </button>
      </div>
    </>
  );
};

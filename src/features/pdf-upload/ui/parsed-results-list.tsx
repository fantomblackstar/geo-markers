import { CheckCircle, FileText } from "lucide-react";
import { ParsedPdfGeoItem } from "../lib/parse-pdf";

interface ParsedResultsListProps {
  results: ParsedPdfGeoItem[];
  fileName?: string;
}

export const ParsedResultsList = ({
  results,
  fileName,
}: ParsedResultsListProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-green-50 border-b border-green-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">
              Успішно оброблено!
            </h3>
          </div>
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              {fileName}
            </div>
          )}
        </div>
        <p className="text-sm text-green-700 mt-1">
          Знайдено {results.length} об'єктів
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {results.map((item, index) => (
          <div key={item.id}>
            <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {item.id}
                    </span>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 font-mono">{item.mgrs}</p>
                </div>
              </div>
            </div>
            {index < results.length - 1 && (
              <div className="border-b border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

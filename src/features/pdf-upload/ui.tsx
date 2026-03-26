import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { parsePdfFile, ParsedPdfGeoItem } from "./lib/parse-pdf";
import { useGeoItemsStore } from "src/shared/lib";
import { parseLatLongFromGeoCode } from "src/shared/lib";
import { GeoItem } from "src/shared/model";
import { UploadZone } from "./ui/upload-zone";
import { ParsedResultsList } from "./ui/parsed-results-list";
import { ResultsActions } from "./ui/results-actions";

export const PdfUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [parsedResults, setParsedResults] = useState<ParsedPdfGeoItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setGeoItems = useGeoItemsStore((state) => state.setGeoItems);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      await handleFile(file);
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setErrorMessage("Будь ласка, завантажте PDF файл");
      return;
    }

    setUploadedFile(file);
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const result = await parsePdfFile(file);

      if (result.length === 0) {
        setStatus("error");
        setErrorMessage(
          "Вміст PDF не відповідає очікуваному формату. Переконайтеся, що файл містить розділ 'Перелік об'єктів' з даними MGRS.",
        );
        setParsedResults([]);
      } else {
        setParsedResults(result);
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Не вдалося обробити PDF",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setStatus("idle");
    setUploadedFile(null);
    setParsedResults([]);
    setErrorMessage("");
  };

  const exportToCSV = () => {
    if (parsedResults.length === 0) return;

    const headers = ["ID", "Назва", "MGRS"];
    const rows = parsedResults.map((item) => [item.id, item.name, item.mgrs]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `parsed-items-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addToMap = () => {
    if (parsedResults.length === 0) return;

    const geoItems: GeoItem[] = parsedResults.map((item) => {
      const [latitude, longitude] = parseLatLongFromGeoCode(item.mgrs);
      return {
        id: item.id.toString(),
        title: item.name,
        latitude,
        longitude,
        geoDescription: item.mgrs,
      };
    });

    setGeoItems(geoItems);
    alert(`${geoItems.length} об'єктів додано на карту!`);
  };

  return (
    <div className="w-full">
      <UploadZone
        isDragging={isDragging}
        isLoading={isLoading}
        status={status}
        errorMessage={errorMessage}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onReset={handleReset}
        fileInputRef={fileInputRef}
        onFileChange={handleFileInput}
      />

      {status === "success" && parsedResults.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ParsedResultsList
            results={parsedResults}
            fileName={uploadedFile?.name}
          />
          <ResultsActions
            onExportCSV={exportToCSV}
            onAddToMap={addToMap}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
};

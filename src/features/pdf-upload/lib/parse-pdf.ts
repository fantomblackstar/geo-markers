import * as pdfjsLib from "pdfjs-dist";

// Use jsdelivr CDN which has better CORS and module support
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export interface ParsedPdfGeoItem {
  id: number;
  name: string;
  mgrs: string;
}

function parseItemsFromPDFText(text: string): ParsedPdfGeoItem[] {
  const results: ParsedPdfGeoItem[] = [];

  const sectionStart = text.indexOf("Перелік об’єктів");
  if (sectionStart === -1) return results;

  const sectionText = text.slice(sectionStart);

  const blocks = sectionText.split(/(?<=\s)(?=\d+\)\.\s)/);

  for (const block of blocks) {
    const headerMatch = block.match(/^(\d+)\)\.\s+(.+?)\s{2,}/);
    const mgrsMatch = block.match(/MGRS:\s*([A-Z0-9]+\s+\d+\s+\d+)/);

    if (headerMatch && mgrsMatch) {
      results.push({
        id: parseInt(headerMatch[1]),
        name: headerMatch[2].trim().replace(/"/g, ""),
        mgrs: mgrsMatch[1].trim(),
      });
    }
  }

  return results;
}

export async function parsePdfFile(file: File): Promise<ParsedPdfGeoItem[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    const textPages: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      textPages.push(pageText);
    }

    const allText = textPages.join("\n\n");

    const parsedItems = parseItemsFromPDFText(allText);

    return parsedItems;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error;
  }
}

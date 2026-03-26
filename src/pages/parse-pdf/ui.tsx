import { Header } from "../../features/header";
import { PdfUpload } from "../../features/pdf-upload";

export const ParsePdf = () => {
  return (
    <section className="relative w-full h-screen flex flex-col">
      <Header />
      <div className="h-auto grow md:mt-14 mt-[100px] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Парсер PDF</h1>
          <p className="text-gray-600 mb-8 text-center">
            Завантажте PDF файл для витягування текстового вмісту
          </p>
          <PdfUpload />
        </div>
      </div>
    </section>
  );
};

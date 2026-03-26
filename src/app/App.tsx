import "./global.css";
import "leaflet/dist/leaflet.css";
import "react-tooltip/dist/react-tooltip.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";

import { AuthProvider } from "../shared/model/auth-context";
import { AuthGuard } from "../shared/ui/auth-guard";
import { ParsePdf } from "src/pages/parse-pdf";

function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parse-pdf" element={<ParsePdf />} />
          </Routes>
        </BrowserRouter>
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;

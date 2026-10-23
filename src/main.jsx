import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./data/DataContext";
import { AudioProvider } from "./context/AudioContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);

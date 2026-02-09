import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider, NotificationProvider } from "@vayuko/ui";
import "@vayuko/ui/dist/ui.css";
import "./index.css";
import App from "./App.tsx";

// Use HashRouter when built with base path (e.g. GitHub Pages) so routes work without server config
const isDeployed = import.meta.env.BASE_URL !== "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider mode="light">
      <NotificationProvider position="top-right">
        {isDeployed ? (
          <HashRouter>
            <App />
          </HashRouter>
        ) : (
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )}
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);

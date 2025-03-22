import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { UIProvider } from "./context/ui-context";

createRoot(document.getElementById("root")!).render(
  <UIProvider>
    <App />
  </UIProvider>
);

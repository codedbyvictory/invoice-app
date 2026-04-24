import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </BrowserRouter>
);
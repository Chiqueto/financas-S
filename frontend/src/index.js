import React from "react";
import { createRoot } from "react-dom/client";
import App from "./main/App";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./custom.css";
import { AuthProvider } from "./app/services/authContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./main/App";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./custom.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

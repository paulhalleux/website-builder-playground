import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { Router } from "./routes";

import "./index.style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
);

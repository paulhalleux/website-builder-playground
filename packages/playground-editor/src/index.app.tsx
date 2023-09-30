import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Page, useStorageValue, Website } from "@playground/common";

import { Preview } from "./components/Preview";
import { Editor } from "./components";

import "./index.style.scss";

function App() {
  const value = useStorageValue<Website>("editor-value");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/preview">{getChildRoutes(value.content)}</Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function getChildRoutes(routes: Page[]) {
  return routes.map((route) => {
    return (
      <Route
        key={route.id}
        path={route.path.replace(/^\//, "")}
        element={<Preview page={route} />}
      >
        {getChildRoutes(route.children)}
      </Route>
    );
  });
}

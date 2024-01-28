import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store.ts";
import App from "./App.tsx";
import "./main.css";
// import "./styles/app.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<App />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

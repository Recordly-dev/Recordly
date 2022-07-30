import React from "react";
import ReactDOM from "react-dom";
import App from "pages/loginPage";
import { BrowserRouter } from "react-router-dom";

import styles from "./index.module.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

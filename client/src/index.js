import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import App from "./pages/loginPage";
=======
import Editor from "./util/Editor";
import App from "./test_1";
>>>>>>> feature/REC-40
import { BrowserRouter } from "react-router-dom";

import styles from "./index.module.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Editor />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import Editor from "./util/Editor";
import App from "./test_1";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Editor />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


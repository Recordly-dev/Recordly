import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./store";

import LoginPage from "pages/loginPage";
import Main from "pages/main";
import Editor from "pages/editorPage";
import PdfEditor from "pages/pdfEditor";

const path = "api/public/assets/pdf-dist/dc19-07.pdf";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/shortcuts" element={<Main />} />
        <Route path="/main/tags" element={<Main />} />
        <Route path="/workspace/:tid" element={<Editor />} />
        <Route path="/pdfzzang" element={<PdfEditor pdfPath={path} />} />
      </Routes>
    </Provider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./store";

import LoginPage from "pages/loginPage";
import MainPage from "pages/mainPage";
import Editor from "pages/editorPage";
// import PdfEditor from "pages/pdfEditor";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/:tid" element={<MainPage />} />
        <Route path="/favorites" element={<MainPage />} />
        <Route path="/tags" element={<MainPage />} />
        <Route path="/workspace/:tid" element={<Editor />} />
        {/* <Route path="/pdfzzang" element={<PdfEditor pdfPath={path} />} /> */}
      </Routes>
    </Provider>
  );
};

export default App;

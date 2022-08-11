import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/loginPage";
import Main from "pages/main";
// import EditorPage from "pages/editorPage";
import EditorPage from "pages/editorSlate";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  );
};

export default App;

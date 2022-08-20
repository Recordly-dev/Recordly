import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/loginPage";
import Main from "pages/main";
import Editor from "components/Editor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/workspace/:tid" element={<Editor />} />
    </Routes>
  );
};

export default App;

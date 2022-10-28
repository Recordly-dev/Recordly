import { Route, Routes } from "react-router-dom";

import LoginPage from "pages/loginPage";
import MainPage from "pages/mainPage";
import Editor from "pages/editorPage";
// import PdfEditor from "pages/pdfEditor";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/main/:tid" element={<MainPage />} />
      <Route path="/favorites" element={<MainPage />} />
      <Route path="/tags" element={<MainPage />} />
      <Route path="/workspace/:tid" element={<Editor />} />
    </Routes>
  );
};

export default App;

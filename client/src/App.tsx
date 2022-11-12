import { Route, Routes } from "react-router-dom";

import LoginPage from "pages/loginPage";
import MainPage from "pages/mainPage";
import Editor from "pages/editorPage";
// import PdfEditor from "pages/pdfEditor";

import "./common/assets/fonts/font.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/main/:tid" element={<MainPage isFolderDetailPage />} />
      <Route path="/favorites" element={<MainPage isFavoritesPage />} />
      <Route path="/tags" element={<MainPage isTagPage />} />
      <Route path="/workspace/:tid" element={<Editor />} />
    </Routes>
  );
};

export default App;

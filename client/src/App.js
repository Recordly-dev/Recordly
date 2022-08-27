import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./store";

import LoginPage from "pages/loginPage";
import Main from "pages/main";
import Editor from "components/Editor";

const data = ["1234", "567"];
const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/workspace/:tid" element={<Editor data={data} />} />
      </Routes>
    </Provider>
  );
};

export default App;

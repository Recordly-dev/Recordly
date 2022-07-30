import React from "react";

import Header from "components/Header";
import SearchBar from "components/SearchBar";
import Footer from "components/Footer";

import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Main;

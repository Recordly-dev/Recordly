import React from "react";
import cn from "classnames";

import Header from "components/Header";
import Footer from "components/Footer";
import TagContainer from "components/TagContainer";
import MainDashboard from "components/MainDashboard";

import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className={cn(styles.Main)}>
      <Header />
      <div className={cn(styles.Main__container, "d-flex", "m-3", "p-3")}>
        <div className={cn(styles.Main__container__tagList, "w-25")}>
          <TagContainer />
        </div>
        <div className={cn(styles.Main__container__mainDashboard, "w-75")}>
          <MainDashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

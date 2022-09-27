import React from "react";
import cn from "classnames";

import Footer from "components/Footer";
import TagContainer from "components/TagContainer";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className={cn(styles.Main, "d-flex", "mt-3")}>
      <div className={cn("d-flex", "justify-content-center", "w-100")}>
        <div
          className={cn(
            styles.Main__container,
            "d-flex",
            "justify-content-center"
          )}
        >
          <aside className={cn(styles.Main__container__tagList)}>
            <TagContainer />
          </aside>
          <section className={cn("d-flex", "justify-content-center")}>
            <div className={cn(styles.Main__container__mainDashboard)}>
              <MainHeader />
              <MainDashboard />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

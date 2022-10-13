import React from "react";
import cn from "classnames";

import Footer from "components/Footer";
import SideNavMenu from "components/SideNavMenu";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className={cn(styles.Main, "d-flex", "mt-3")}>
      <div className={cn("d-flex", "w-100")}>
        <div className={cn(styles.Main__container, "d-flex")}>
          <aside className={cn(styles.Main__container__sideMenu)}>
            <SideNavMenu />
          </aside>
          <section className={cn("d-flex", "w-100")}>
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

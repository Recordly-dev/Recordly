import React from "react";
import cn from "classnames";

import Footer from "components/Footer";
import SideNavMenu from "components/SideNavMenu";
import MainPageDashboard from "components/MainDashboard";
import MainPageHeader from "components/MainHeader";

import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={cn(styles.MainPage, "d-flex", "mt-3")}>
      <div className={cn("d-flex", "w-100")}>
        <div className={cn(styles.MainPage__container, "d-flex")}>
          <aside className={cn(styles.MainPage__container__sideMenu)}>
            <SideNavMenu />
          </aside>
          <section className={cn("d-flex", "w-100")}>
            <div className={cn(styles.MainPage__container__mainDashboard)}>
              <MainPageHeader />
              <MainPageDashboard />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;

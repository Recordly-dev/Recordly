import React from "react";
import cn from "classnames";

import Footer from "components/Footer";
import SideNavMenu from "components/SideNavMenu";
import FavoritesDashboard from "components/FavoritesDashboard";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

import styles from "./MainPage.module.scss";

const MainPage = ({
  isFavorites,
  isDetail,
}: {
  isFavorites?: boolean;
  isDetail?: boolean;
}) => (
  <div className={styles.MainPage}>
    <div className={cn("d-flex", "w-100")}>
      <div className={styles.MainPage__container}>
        <aside className={styles.MainPage__container__sideMenu}>
          <SideNavMenu />
        </aside>
        <section className={cn("d-flex", "w-100")}>
          <div className={styles.MainPage__container__mainDashboard}>
            <MainHeader />
            {isFavorites ? (
              <FavoritesDashboard />
            ) : (
              <MainDashboard isDetail={isDetail} />
            )}
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default MainPage;

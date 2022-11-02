import React from "react";
import cn from "classnames";

import { Button } from "reactstrap";

import Footer from "components/Footer";
import SideNavMenu from "components/SideNavMenu";
import FavoritesDashboard from "components/FavoritesDashboard";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

import styles from "./MainPage.module.scss";
import SideTagsMenu from "components/SideTagsMenu";

const MainPage = ({
  isFavoritesPage,
  isFolderDetailPage,
  isTagPage,
}: {
  isFavoritesPage?: boolean;
  isFolderDetailPage?: boolean;
  isTagPage?: boolean;
}) => (
  <div className={styles.MainPage}>
    <div className={cn("d-flex", "w-100")}>
      <div className={styles.MainPage__container}>
        <aside className={styles.MainPage__container__sideMenu}>
          <SideNavMenu />
        </aside>
        {isTagPage && <SideTagsMenu />}
        <section className={cn("d-flex", "w-100")}>
          <div
            className={cn({
              [styles.MainPage__container__mainDashboard]: true,
              [styles.MainPage__container__mainDashboard__tags]: isTagPage,
            })}
          >
            <MainHeader isFavoritesPage={isFavoritesPage} />
            {isFavoritesPage ? (
              <FavoritesDashboard isFavoritesPage />
            ) : (
              <MainDashboard isFolderDetailPage={isFolderDetailPage} isTagPage={isTagPage} />
            )}
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
);

export default MainPage;

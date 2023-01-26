import { useState } from "react";
import cn from "classnames";

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
}) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className={styles.MainPage}>
      <div className={cn("d-flex", "w-100")}>
        <div className={styles.MainPage__container}>
          <aside className={styles.MainPage__container__sideMenu}>
            <SideNavMenu />
          </aside>
          {isTagPage && <SideTagsMenu />}
          <section className={styles.MainPage__container__dashboard}>
            <div
              className={cn({
                [styles.MainPage__container__mainDashboard]: true,
                [styles.MainPage__container__mainDashboard__tags]: isTagPage,
              })}
            >
              <MainHeader
                isFolderDetailPage={isFolderDetailPage}
                isFavoritesPage={isFavoritesPage}
                isTagPage={isTagPage}
                setIsSearch={setIsSearch}
              />
              {isFavoritesPage ? (
                <FavoritesDashboard isFavoritesPage />
              ) : (
                <MainDashboard
                  isFolderDetailPage={isFolderDetailPage}
                  isTagPage={isTagPage}
                  isSearch={isSearch}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState, useEffect } from "react";
import cn from "classnames";

import Footer from "components/Footer";
import SideNavMenu from "components/SideNavMenu";
import FavoritesDashboard from "components/FavoritesDashboard";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

import { useSelector } from "react-redux";

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
  const [isEmptyDashboard, setIsEmptyDashboard] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const workspaceList = useSelector(
    (state: any) => state.workspace.workspaceList
  );
  const folderList = useSelector((state: any) => state.folder.folderList);

  const isLoadingFetchWorkspace: boolean = useSelector(
    (state: any) => state.workspace.isLoading
  );

  const isLoadingFetchFolder: boolean = useSelector(
    (state: any) => state.folder.isLoading
  );

  useEffect(() => {
    if (workspaceList?.length === 0 && folderList?.length === 0) {
      setIsEmptyDashboard(true);
      return;
    }
    setIsEmptyDashboard(false);
  }, [isTagPage, isFolderDetailPage, isFavoritesPage, isLoadingData]);

  useEffect(() => {
    setIsLoadingData(isLoadingFetchWorkspace || isLoadingFetchFolder);
  }, [isLoadingFetchWorkspace, isLoadingFetchFolder]);

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
              />
              {isFavoritesPage ? (
                <FavoritesDashboard
                  isFavoritesPage
                  isEmptyDashboard={isEmptyDashboard}
                  isLoadingData={isLoadingData}
                />
              ) : (
                <MainDashboard
                  isFolderDetailPage={isFolderDetailPage}
                  isTagPage={isTagPage}
                  isEmptyDashboard={isEmptyDashboard}
                  isLoadingData={isLoadingData}
                />
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;

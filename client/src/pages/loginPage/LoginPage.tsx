import React from "react";
import cn from "classnames";
import { FullPage, Slide } from "react-full-page";

import Header from "components/Header";
import MainTitle from "components/MainTitle";
import GoogleOauth from "components/GoogleOauth";

import useMediaQuery from "hooks/useMediaQuery";

import dashboardImage from "common/assets/images/dashboard.png";
import workspaceImage from "common/assets/images/workspace.png";
import recommendedImage from "common/assets/images/recommended.png";

import useMoveScroll from "hooks/useMoveScroll";

import styles from "./LoginPage.module.scss";

import CONSTANT from "./constants";

const LoginPage = () => {
  const { element, onMoveToElement } = useMoveScroll();
  const minMediaLg = useMediaQuery("(min-width: 1199px)");

  return (
    <div className={cn(styles.LoginPage)}>
      <Header onMoveToElement={onMoveToElement} />

      <section
        className={cn(
          styles.LoginPage__container,
          "d-flex",
          "justify-content-center",
          "align-items-center"
        )}
      >
        <div
          className={cn(
            styles.LoginPage__section,
            "d-flex",
            "flex-column",
            "justify-content-between"
          )}
        >
          {minMediaLg ? (
            <FullPage duration={50}>
              <Slide>
                <div className={cn(styles.LoginPage__first)}>
                  <div className={styles.LoginPage__element}>
                    <MainTitle
                      mainText={CONSTANT.FIRST_PAGE_INFO.MAIN}
                      description={CONSTANT.FIRST_PAGE_INFO.DESCRIPTION}
                    />
                    <img
                      className={styles.LoginPage__image}
                      src={dashboardImage}
                      alt="dashboard"
                    />
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className={cn(styles.LoginPage__second)}>
                  <div className={styles.LoginPage__element}>
                    <MainTitle
                      mainText={CONSTANT.SECOND_PAGE_INFO.MAIN}
                      description={CONSTANT.SECOND_PAGE_INFO.DESCRIPTION}
                    />
                    <img
                      className={styles.LoginPage__image}
                      src={workspaceImage}
                      alt="dashboard"
                    />
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className={cn(styles.LoginPage__third)}>
                  <div
                    className={cn(
                      "d-flex",
                      "flex-column",
                      "align-items-center"
                    )}
                  >
                    <div className={styles.LoginPage__third__container}>
                      <MainTitle
                        mainText={CONSTANT.THIRD_PAGE_INFO.MAIN}
                        description={CONSTANT.THIRD_PAGE_INFO.DESCRIPTION}
                      />
                      <img
                        className={styles.LoginPage__image}
                        src={recommendedImage}
                        alt="recommended"
                      />
                    </div>
                    <GoogleOauth loginRef={element} />
                  </div>
                </div>
              </Slide>
            </FullPage>
          ) : (
            <>
              <div className={cn(styles.LoginPage__first)}>
                <div className={styles.LoginPage__element}>
                  <MainTitle
                    mainText={CONSTANT.FIRST_PAGE_INFO.MAIN}
                    description={CONSTANT.FIRST_PAGE_INFO.DESCRIPTION}
                  />
                  <img
                    className={styles.LoginPage__image}
                    src={dashboardImage}
                    alt="dashboard"
                  />
                </div>
              </div>
              <div className={cn(styles.LoginPage__second)}>
                <div className={styles.LoginPage__element}>
                  <MainTitle
                    mainText={CONSTANT.SECOND_PAGE_INFO.MAIN}
                    description={CONSTANT.SECOND_PAGE_INFO.DESCRIPTION}
                  />
                  <img
                    className={styles.LoginPage__image}
                    src={workspaceImage}
                    alt="dashboard"
                  />
                </div>
              </div>
              <div className={cn(styles.LoginPage__third)}>
                <div
                  className={cn("d-flex", "flex-column", "align-items-center")}
                >
                  <div className={styles.LoginPage__third__container}>
                    <MainTitle
                      mainText={CONSTANT.THIRD_PAGE_INFO.MAIN}
                      description={CONSTANT.THIRD_PAGE_INFO.DESCRIPTION}
                    />
                    <img
                      className={styles.LoginPage__image}
                      src={recommendedImage}
                      alt="recommended"
                    />
                  </div>
                  <GoogleOauth loginRef={element} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

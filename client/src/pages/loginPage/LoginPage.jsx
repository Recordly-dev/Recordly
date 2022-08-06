import React from "react";
import cn from "classnames";

import Header from "components/Header";
import MainTitle from "components/MainTitle";
import GoogleOauth from "containers/GoogleOauth";
import MainImage from "components/MainImage";
import Footer from "components/Footer";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <Header />
      <section
        className={cn(
          styles.LoginPage__container,
          "d-flex",
          "justify-content-center",
          "m-5",
          "p-5"
        )}
      >
        <div className={cn(styles.LoginPage__leftSection, "w-50")}>
          <MainTitle />
          <GoogleOauth />
        </div>
        <div
          className={cn(
            styles.LoginPage__rightSection,
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "w-50"
          )}
        >
          <MainImage />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;

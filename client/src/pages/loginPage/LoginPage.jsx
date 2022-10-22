import React, { useCallback } from "react";
import cn from "classnames";
import { loadFull } from "tsparticles";

import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import GoogleOauth from "./components/GoogleOauth";

import Particles from "react-tsparticles";
import Footer from "components/Footer";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className={cn(styles.LoginPage)}>
      <Header />
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
            styles.LoginPage__Section,
            "d-flex",
            "flex-column",
            "justify-content-center",
            "align-items-center"
          )}
        >
          <MainTitle />
          <GoogleOauth />
        </div>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "black",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {},
                resize: false,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 20,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 10,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                directions: "none",
                enable: true,

                random: false,
                speed: 5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 20,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
          }}
        />
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;

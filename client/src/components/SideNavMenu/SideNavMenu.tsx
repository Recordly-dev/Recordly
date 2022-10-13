import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";

import { Button } from "reactstrap";

import CONSTANT from "./constants";

import styles from "./SideNavMenu.module.scss";

const SideNavMenu = () => {
  const [activeTab, setActiveTab] = useState("/main");
  const currentLocation = useLocation();

  useEffect(() => {
    const path = String(currentLocation.pathname);

    setActiveTab(path);
  }, [currentLocation]);
  return (
    <section
      className={cn(
        styles.SideNavMenu,
        "d-flex",
        "flex-column",
        "align-items-center"
      )}
    >
      <ul className={styles.SideNavMenu__container}>
        <li className={styles.SideNavMenu__create}>
          <Button
            color="primary"
            size="md"
            className={styles.SideNavMenu__create__button}
          >
            New
          </Button>
        </li>
        <hr />
        {CONSTANT.navItem.map((item) => (
          <li className={styles.SideNavMenu__item}>
            <Link to={item.link}>
              <button
                className={cn(styles.SideNavMenu__item__button, {
                  [styles.SideNavMenu__item__active]: activeTab === item.link,
                })}
              >
                {item.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SideNavMenu;

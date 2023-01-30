import React from "react";
import cn from "classnames";

import { NavLink } from "react-router-dom";

import CloseIcon from "common/assets/icons/CloseIcon";

import Sidebar from "components/Sidebar";
import Avatar from "components/Avatar";

import styles from "./MoblieSideNavMenu.module.scss";

import CONSTANT from "./constants";

import { IUser } from "types/user";

const MoblieSideNavMenu = ({
  userData,
  isLoggedIn,
  isOpen,
  toggleMobileMenu,
  logout,
}: {
  userData?: IUser;
  isLoggedIn: boolean;
  isOpen: boolean;
  toggleMobileMenu: React.MouseEventHandler<HTMLAnchorElement>;
  logout: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <Sidebar isOpen={isOpen}>
    <div className={styles.MoblieSideNavMenu}>
      <CloseIcon
        onClick={toggleMobileMenu}
        className={styles.MoblieSideNavMenu__closeIcon}
        color="white"
        width={CONSTANT.ICON_SIZE.CLOSE}
        height={CONSTANT.ICON_SIZE.CLOSE}
      />
      <div
        className={cn(styles.MoblieSideNavMenu__userWrapper, {
          [styles.MoblieSideNavMenu__userWrapper__logout]: !isLoggedIn,
        })}
      >
        <div className={styles.MoblieSideNavMenu__userInfo}>
          <div className={styles.MoblieSideNavMenu__avatarWrapper}>
            <Avatar
              libAvatarProps={{
                src: userData?.profileImage!,
                name: userData?.username!,
                size: "40",
                round: true,
                className: styles.MoblieSideNavMenu__avatarFont,
              }}
            />
            <div className={styles.MoblieSideNavMenu__nameInfo}>
              <a
                href="/change_info"
                className={styles.MoblieSideNavMenu__userName}
              >
                {userData?.username}
              </a>
              {userData?.email && (
                <div className={styles.MoblieSideNavMenu__userEmail}>
                  {userData?.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.MoblieSideNavMenu__menuWrapper}>
        {CONSTANT.HEADER_MENUS.loggedInMenu?.map((item) => (
          <NavLink
            key={item.id}
            className={styles.MoblieSideNavMenu__itemWrapper}
            to={item.link}
            onClick={toggleMobileMenu}
          >
            <div className={styles.MoblieSideNavMenu__menuItem}>
              <span>{item.name}</span>
            </div>
          </NavLink>
        ))}
      </ul>

      <div className={styles.MoblieSideNavMenu__menuDivider} />
      <ul className={styles.MoblieSideNavMenu__menuWrapper}>
        <div className={styles.MoblieSideNavMenu__itemWrapper} onClick={logout}>
          <div
            className={cn(
              styles.MoblieSideNavMenu__menuItem,
              styles.MoblieSideNavMenu__menuItem__signOut
            )}
          >
            Logout
          </div>
        </div>
      </ul>
    </div>
  </Sidebar>
);

export default MoblieSideNavMenu;

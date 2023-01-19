import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import cn from "classnames";
import Swal from "sweetalert2";

import { actions as workspaceActions } from "store/slice/workspaceSlice";
import { useDispatch } from "store";

import useMediaQuery from "hooks/useMediaQuery";

import MenuIcon from "common/assets/icons/MenuIcon";

import SearchBar from "components/SearchBar";
import Avatar from "components/Avatar";
import DropdownSelect from "components/DropdownSelect";
import EditDropdown from "components/EditDropdown";
import MoveToBackButton from "components/MoveToBackButton";
import MoblieSideNavMenu from "components/MoblieSideNavMenu";

import { IFolder } from "types/folder";
import { IUser } from "types/user";

import styles from "./MainHeader.module.scss";

import CONSTANT from "./constants";

const MainHeader = ({
  isFolderDetailPage,
  isFavoritesPage,
  isTagPage,
}: {
  isFolderDetailPage?: boolean;
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
}) => {
  const [userData, setUserData] = useState<IUser>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleMobileSidebar, setToggleMobileSidebar] = useState(false);
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data: profile } = await axios.get("/api/profile");
      setUserData(profile);
    })();
  }, []);

  const maxWidthMd = useMediaQuery("(max-width: 991px)");
  const maxWidthXs = useMediaQuery("(max-width: 575px)");

  const toggleMobileMenu = () => {
    setToggleMobileSidebar((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOnClick = (type: string) => {
    dispatch(workspaceActions.sortWorkspaceList({ type }));
  };

  useEffect(() => {
    (async () => {
      if (!isFolderDetailPage) {
        return;
      }
      const { data } = await axios.get("/api/folder");
      const [currentFolder] = data.filter(
        (folder: IFolder) =>
          folder._id === window?.location?.pathname.split("/").at(-1) || ""
      );

      setFolderName(currentFolder?.title);
    })();
  }, [isFolderDetailPage]);

  const logout = (): void => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          title: "로그아웃에 실패했습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
        console.log(err, "로그아웃 실패");
      });
  };

  const moveGoBack = () => {
    navigate(`/main`);
    dispatch(workspaceActions.fetchWorkspaceList());
  };

  const dropdownItem = [
    {
      title: "Logout",
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <header
      className={cn(
        styles.MainHeader,
        "d-flex",
        "align-items-center",
        "justify-content-center",
        {
          [styles.MainHeader__mobile]: maxWidthXs,
          [styles.TagPageHeader]: isTagPage,
        }
      )}
    >
      <div
        className={cn(
          styles.MainHeader__container,
          "d-flex",
          "align-items-center",
          "justify-content-between"
        )}
      >
        <div
          className={cn(
            styles.MainHeader__container__left,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
        >
          {isFolderDetailPage ? (
            <>
              <MoveToBackButton moveGoBack={moveGoBack} />
              <span className={styles.MainHeader__folderPath}>
                {folderName}
              </span>
            </>
          ) : (
            maxWidthMd && (
              <h3 className={styles.MainHeader__mainTitle}>Recordly</h3>
            )
          )}
        </div>

        <div
          className={cn(
            styles.MainHeader__container__right,
            "d-flex",
            "align-items-center",
            "justify-content-center"
          )}
        >
          {!maxWidthXs && (
            <>
              <SearchBar
                isFavoritesPage={isFavoritesPage}
                isTagPage={isTagPage}
              />
              <DropdownSelect handleDropdownItem={handleDropdownOnClick} />
            </>
          )}

          {maxWidthMd ? (
            <>
              <MenuIcon
                className={styles.MainHeader__menuIcon}
                onClick={toggleMobileMenu}
                color="black"
                width={CONSTANT.ICON_SIZE.MENU}
                height={CONSTANT.ICON_SIZE.MENU}
              />
              <MoblieSideNavMenu
                toggleMobileMenu={toggleMobileMenu}
                isLoggedIn={true}
                isOpen={toggleMobileSidebar}
                logout={logout}
                userData={userData}
              />
            </>
          ) : (
            <div className={styles.MainHeader__Avatar}>
              <Avatar
                toggleDropdown={toggleDropdown}
                libAvatarProps={{
                  src: userData?.profileImage!,
                  name: userData?.username!,
                  size: "40",
                  round: true,
                }}
              />
              <EditDropdown
                className={styles.MainHeader__dropdown}
                isDropdownOpen={isDropdownOpen}
                toggle={toggleDropdown}
                dropdownItem={dropdownItem}
                direction={"down"}
              />
            </div>
          )}
        </div>
      </div>
      {maxWidthXs && !isTagPage && (
        <>
          <div className={styles.devider} />
          <div
            className={cn(
              "d-flex",
              "align-items-center",
              "justify-content-end",
              "w-100",
              "me-4"
            )}
          >
            <SearchBar
              isFavoritesPage={isFavoritesPage}
              isTagPage={isTagPage}
            />
            <DropdownSelect handleDropdownItem={handleDropdownOnClick} />
          </div>
        </>
      )}
    </header>
  );
};

export default MainHeader;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import Swal from "sweetalert2";

import { Button } from "reactstrap";

import { actions as workspaceActions } from "store/slice/workspaceList";
import { actions as folderActions } from "store/slice/folderList";
import { useDispatch } from "store";

import styles from "./SideNavMenu.module.scss";

import CONSTANT from "./constants";

const SideNavMenu = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("/main");
  const currentLocation = useLocation();

  const handleButtonClick = (): void => {
    let title: string;
    let workspaceType: string;

    Swal.fire({
      title: "메모 제목을 적어주세요.",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        return title;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "일반 메모와 PDF를 선택해주세요.",
          showDenyButton: true,
          confirmButtonText: "MEMO",
          denyButtonText: `PDF`,
        }).then((workspace) => {
          title = result.value;
          if (workspace.isConfirmed) {
            workspaceType = "docs";
          } else if (workspace.isDenied) {
            workspaceType = "pdf";
          }

          dispatch(workspaceActions.postWorkspace({ title, workspaceType }));
        });
      }
    });
  };

  const handlePostFolder = () => {
    Swal.fire({
      title: "폴더 이름을 적어주세요.",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Create",
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        return title;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((res) => {
        if (res.isConfirmed) {
          dispatch(folderActions.postFolderList({ title: res?.value }));
        }
      })
      .catch((err) => {
        if (err.response.data.error === 11000) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "중복된 이름이 있습니다.",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "메모 폴더에 실패했습니다.",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

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
            onClick={handleButtonClick}
          >
            New
          </Button>
          <Button
            color="primary"
            size="md"
            className={styles.SideNavMenu__create__button}
            onClick={handlePostFolder}
          >
            New Folder
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

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import cn from "classnames";
import Swal from "sweetalert2";

import { usePostWorkspace } from "query-hooks/useFetchWorkspace";
import { usePostFolder } from "query-hooks/useFetchFolder";

import FolderIcon from "common/assets/icons/FolderIcon";
import FileIcon from "common/assets/icons/FileIcon";

import { Button } from "reactstrap";

import styles from "./SideNavMenu.module.scss";

import CONSTANT from "./constants";

const SideNavMenu = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/main");
  const currentLocation = useLocation();

  const { mutateAsync: mutatePostWorkspace } = usePostWorkspace();
  const { mutateAsync: mutatePostFolder } = usePostFolder();

  const moveDashboard = () => navigate("/main");

  const createWorkspace = (): void => {
    moveDashboard();
    let title: string;
    let workspaceType: string;

    Swal.fire({
      title: "Please write the memo title.",
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
      title = result.value;
      workspaceType = "docs";

      mutatePostWorkspace({ title, workspaceType });
    });
  };

  const createFolder = () => {
    moveDashboard();
    Swal.fire({
      title: "Please write the folder title.",
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
    }).then((res) => {
      if (res.isConfirmed) {
        const title = res?.value;

        mutatePostFolder({ title });
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
      <p className={styles.SideNavMenu__title}>Recordly</p>
      <ul className={styles.SideNavMenu__container}>
        <li className={styles.SideNavMenu__create}>
          <Button
            color="primary"
            size="md"
            className={styles.SideNavMenu__create__button}
            onClick={createWorkspace}
          >
            <div
              className={cn(
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <FileIcon width="20px" height="20px" />
              <span className="ms-2">Memo</span>
            </div>
          </Button>
          <Button
            color="primary"
            size="md"
            className={styles.SideNavMenu__create__button}
            onClick={createFolder}
          >
            <div
              className={cn(
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <FolderIcon width="20px" height="20px" />
              <span className="ms-2">Folder</span>
            </div>
          </Button>
        </li>
        {CONSTANT.NAV_ITEM.map((item) => (
          <li className={styles.SideNavMenu__item}>
            <Link to={item.link}>
              <button
                className={cn(styles.SideNavMenu__item__button, {
                  [styles.SideNavMenu__item__active]: activeTab.includes(
                    item.link
                  ),
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

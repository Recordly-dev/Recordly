import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import axios from "axios";
import Swal from "sweetalert2";

import { Button } from "reactstrap";

import { fetchFolderList } from "store/slice/folderListSlice";
import { useDispatch } from "store";

import styles from "./SideNavMenu.module.scss";

import CONSTANT from "./constants";

const SideNavMenu = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("/main");
  const currentLocation = useLocation();

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
      .then(async (res) => {
        if (res.isConfirmed) {
          await axios.post("/api/folder", { title: res?.value });
          console.log("123");
          dispatch(fetchFolderList());
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
            title: "메모 생성에 실패했습니다.",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        console.log(err, "메모 생성 실패");
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
function err(err: any) {
  throw new Error("Function not implemented.");
}

import React, { useEffect, useState } from "react";
import cn from "classnames";

import Swal from "sweetalert2";
import axios from "axios";

import SearchBar from "components/SearchBar";
import WorkspaceList from "components/WorkspaceList";
import styles from "./MainDashboard.module.scss";

const MainDashboard = ({ workspaceList, fetchWorkspace }) => {
  const handleButtonClick = (e) => {
    let title;
    let workspaceType;

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
          axios
            .post("/api/workspace", {
              title: title,
              workspaceType: workspaceType,
            })
            .then((res) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "메모가 생성되었습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
              fetchWorkspace();
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
        });
      }
    });

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className={cn(styles.MainDashboard, "p-4")}>
      <div
        className={cn(
          styles.MainDashboard__header,
          "d-flex",
          "justify-content-between",
          "align-items-center"
        )}
      >
        <h3 className={"ms-3"}>Dashboard</h3>
        <div className={(styles.MainDashboard__right, "d-flex")}>
          <button
            className={styles.MainDashboard__right__button}
            onClick={handleButtonClick}
          >
            새로 만들기
          </button>
          <SearchBar />
        </div>
      </div>

      <WorkspaceList
        workspaceList={workspaceList}
        fetchWorkspace={fetchWorkspace}
      />
    </section>
  );
};

export default MainDashboard;

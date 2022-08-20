import React, { useState } from "react";
import axios from "axios";
import cn from "classnames";

import Swal from "sweetalert2";

import docsImage from "./assets/images/docsImage.png";
import createDocsImage from "./assets/images/createDocsImage.png";

import styles from "./Workspace.module.scss";

const formatDate = (date) => {
  const filterDate = date.substring(5, 16).split("T");

  return (
    <div
      className={cn(
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center"
      )}
    >
      {filterDate.map((v) => (
        <div>{v}</div>
      ))}
    </div>
  );
};

const Workspace = ({ workspaceList, fetchWorkspace }) => {
  const handleWorkSpace = () => {
    Swal.fire("Any fool can use a computer");
  };

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
            .catch(
              Swal.fire({
                position: "center",
                icon: "error",
                title: "메모가 생성에 실패했습니다.",
                showConfirmButton: false,
                timer: 1000,
              })
            );
        });
      }
    });

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cn(styles.Workspace, "d-flex", "flex-wrap", "p-3")}>
      <div
        className={cn(styles.Workspace__container)}
        onClick={handleButtonClick}
      >
        <img src={createDocsImage} alt="create docs" />
        <h6>새로 만들기</h6>
      </div>

      {workspaceList.map((workspace) => (
        <div
          className={cn(styles.Workspace__container)}
          onClick={handleWorkSpace}
        >
          <div className={styles.Workspace__icon}>
            <img src={docsImage} alt="docs cover" />
          </div>
          <h6>{workspace.title}</h6>
          <div>
            <span className={styles.Workspace__dataEdit}>
              마지막 수정 {formatDate(workspace.editedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workspace;

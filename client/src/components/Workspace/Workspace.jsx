import React, { useState } from "react";
import axios from "axios";
import cn from "classnames";

import docsImage from "./assets/images/docsImage.png";
import createDocsImage from "./assets/images/createDocsImage.png";

import CreateDocsModal from "components/CreateDocsModal";

import styles from "./Workspace.module.scss";

const MODAL_INFO = {
  TITLE: "문서 생성",
  YES_TEXT: "생성하기",
};

const Workspace = ({ workspaceList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkSpace = () => {
    alert("hi");
  };

  const handleModalYesBtnClick = (title, workspaceType) => {
    axios
      .post("/api/workspace", { title: title, workspaceType: workspaceType })
      .then((res) => {
        console.log(res);
      });
  };

  const handleModalNoBtnClick = () => {
    setIsModalOpen(false);
  };

  const toggleStatusModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleButtonClick = (e) => {
    toggleStatusModal();

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
              마지막 수정: {workspace.date_edited}
            </span>
          </div>
        </div>
      ))}

      <CreateDocsModal
        isOpen={isModalOpen}
        toggle={toggleStatusModal}
        header={MODAL_INFO.TITLE}
        yesText={MODAL_INFO.YES_TEXT}
        isDocs
        yesFunction={handleModalYesBtnClick}
        noFunction={handleModalNoBtnClick}
      />
    </div>
  );
};

export default Workspace;

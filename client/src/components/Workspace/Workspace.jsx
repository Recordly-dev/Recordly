import React, { useState } from "react";
import cn from "classnames";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import docsImage from "./assets/images/docsImage.png";
import createDocsImage from "./assets/images/createDocsImage.png";

import styles from "./Workspace.module.scss";

const Workspace = ({ workspaceList }) => {
  const [isModal, setIsModal] = useState(false);

  const handleWorkSpace = () => {
    alert("hi");
  };

  const handleCreactDocs = () => {
    setIsModal((prevState) => !prevState);
  };

  return (
    <div className={cn(styles.Workspace, "d-flex", "flex-wrap", "p-3")}>
      <div
        className={cn(styles.Workspace__container)}
        onClick={handleCreactDocs}
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
    </div>
  );
};

export default Workspace;

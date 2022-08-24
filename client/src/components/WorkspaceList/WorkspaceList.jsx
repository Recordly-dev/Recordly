import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import cn from "classnames";
import Workspace from "components/Workspace";

// import createDocsImage from "./assets/images/createDocsImage.png";

import styles from "./WorkspaceList.module.scss";
import MainHeader from "components/MainHeader";

const WorkspaceList = ({ workspaceList, fetchWorkspace }) => {
  const navigate = useNavigate();

  const handleWorkSpace = (id) => {
    navigate(`/workspace/${id}`);
  };

  const formatDate = (date) => {
    const filterDate = date.substring(5, 16).split("T");
    const now = new Date();

    const today = [now.getMonth() + 1, now.getDate()].join("");
    const yesterDay = [now.getMonth() + 1, now.getDate() - 1].join("");

    return (
      <div
        className={cn(
          "d-flex",
          "flex-column",
          "justify-content-center",
          "align-items-center"
        )}
      >
        {filterDate.map((v) => {
          if (v.split("-").map(Number).join("") === today) {
            return "오늘";
          } else if (v.split("-").map(Number).join("") === yesterDay) {
            return "어제";
          } else {
            return <span>{v}</span>;
          }
        })}
      </div>
    );
  };

  return (
    <div className={cn(styles.WorkspaceList, "mt-5")}>
      {workspaceList.map((workspace) => (
        <Workspace
          uid={workspace._id}
          title={workspace.title}
          editedAt={workspace.editedAt}
          handleWorkSpace={handleWorkSpace}
          formatDate={formatDate}
          fetchWorkspace={fetchWorkspace}
        />
      ))}
    </div>
  );
};

export default WorkspaceList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import cn from "classnames";
import Workspace from "components/Workspace";

// import createDocsImage from "./assets/images/createDocsImage.png";

import styles from "./WorkspaceList.module.scss";

const WorkspaceList = ({ workspaceList, fetchWorkspace }) => {
  const navigate = useNavigate();

  const handleWorkSpace = (id) => {
    navigate(`/workspace/${id}`);
  };

  const formatDate = (date) => {
    const filterDate = date.substring(5, 16).split("T");
    const now = new Date();

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

  // const

  console.log(workspaceList);
  return (
    <div className={cn(styles.WorkspaceList, "d-flex", "flex-wrap", "mt-4")}>
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

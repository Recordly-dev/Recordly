import React from "react";

import Workspace from "components/Workspace";

import styles from "./WorkspaceList.module.scss";

const WorkspaceList = ({ workspaceList, fetchWorkspace }) => {
  return (
    <Workspace workspaceList={workspaceList} fetchWorkspace={fetchWorkspace} />
  );
};

export default WorkspaceList;

import React, { useState, useEffect } from "react";
import axios from "axios";

import Workspace from "components/Workspace";

import styles from "./WorkspaceList.module.scss";

const WorkspaceList = ({ workspaceList }) => {
  // const [workspaceList, setWorkspaceList] = useState([]);

  // useEffect(() => {
  //   axios.get("/workspace").then((res) => {
  //     setWorkspaceList(res.data);
  //   });
  // });
  return <Workspace workspaceList={workspaceList} />;
};

export default WorkspaceList;

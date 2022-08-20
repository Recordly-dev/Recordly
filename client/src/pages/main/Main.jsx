import React, { useEffect, useState } from "react";
import axios from "axios";
import cn from "classnames";

import Header from "components/Header";
import Footer from "components/Footer";
import TagContainer from "components/TagContainer";
import MainDashboard from "components/MainDashboard";

import styles from "./Main.module.scss";

const Main = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  const fetchWorkspace = () => {
    axios.get("api/workspace").then((res) => {
      setWorkspaceList(res.data);
    });
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const getWorkspaceHaveTags = (value) => {
    setWorkspaceList(
      workspaceList.filter((workspace) => workspace.tags.includes(value))
    );
  };

  return (
    <div className={cn(styles.Main)}>
      <Header isLogin />
      <div className={cn(styles.Main__container, "d-flex", "m-3", "p-3")}>
        <div className={cn(styles.Main__container__tagList, "w-25")}>
          <TagContainer
            workspaceList={workspaceList}
            getWorkspaceHaveTags={getWorkspaceHaveTags}
          />
        </div>
        <div className={cn(styles.Main__container__mainDashboard, "w-75")}>
          <MainDashboard
            workspaceList={workspaceList}
            fetchWorkspace={fetchWorkspace}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

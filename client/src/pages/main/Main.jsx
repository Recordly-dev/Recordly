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

  useEffect(() => {
    axios.get("api/workspace").then((res, req) => {
      setWorkspaceList(res.data);
      console.log(res);
    });
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
          <MainDashboard workspaceList={workspaceList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

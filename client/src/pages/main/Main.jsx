import React, { useEffect, useState } from "react";
import axios from "axios";
import cn from "classnames";

import Header from "components/Header";
import Footer from "components/Footer";
import TagContainer from "components/TagContainer";
import MainDashboard from "components/MainDashboard";
import MainHeader from "components/MainHeader";

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
    <div className={cn(styles.Main, "d-flex", "mt-3")}>
      <div className={cn("d-flex", "justify-content-center", "w-100")}>
        <div
          className={cn(
            styles.Main__container,
            "d-flex",
            "justify-content-center"
          )}
        >
          {/* <aside className={cn(styles.Main__container__tagList)}>
            <TagContainer
              workspaceList={workspaceList}
              getWorkspaceHaveTags={getWorkspaceHaveTags}
            />
          </aside> */}
          <section className={cn("d-flex", "justify-content-center")}>
            <div className={cn(styles.Main__container__mainDashboard)}>
              <MainHeader fetchWorkspace={fetchWorkspace} />
              <MainDashboard
                workspaceList={workspaceList}
                fetchWorkspace={fetchWorkspace}
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;

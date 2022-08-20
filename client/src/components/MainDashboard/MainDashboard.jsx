import React from "react";
import cn from "classnames";

import SearchBar from "components/SearchBar";
import WorkspaceList from "components/WorkspaceList";
import styles from "./MainDashboard.module.scss";

const MainDashboard = ({ workspaceList, fetchWorkspace }) => {
  return (
    <section className={cn(styles.MainDashboard, "p-4")}>
      <div
        className={cn(
          styles.MainDashboard__header,
          "d-flex",
          "justify-content-between",
          "align-items-center"
        )}
      >
        <h3>Dashboard</h3>
        <SearchBar />
      </div>

      <WorkspaceList
        workspaceList={workspaceList}
        fetchWorkspace={fetchWorkspace}
      />
    </section>
  );
};

export default MainDashboard;

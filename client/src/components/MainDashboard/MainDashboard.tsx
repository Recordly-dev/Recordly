import React from "react";
import cn from "classnames";

import WorkspaceList from "components/WorkspaceList";
import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  return (
    <section className={cn(styles.MainDashboard, "p-4")}>
      <WorkspaceList />
    </section>
  );
};

export default MainDashboard;

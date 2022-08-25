import React, { useEffect, useState } from "react";
import cn from "classnames";

import Swal from "sweetalert2";
import axios from "axios";

import WorkspaceList from "components/WorkspaceList";
import styles from "./MainDashboard.module.scss";

const MainDashboard = ({ workspaceList, fetchWorkspace }) => {
  return (
    <>
      {/* <MainHeader /> */}
      <section className={cn(styles.MainDashboard, "p-4")}>
        <WorkspaceList
          workspaceList={workspaceList}
          fetchWorkspace={fetchWorkspace}
        />
      </section>
    </>
  );
};

export default MainDashboard;

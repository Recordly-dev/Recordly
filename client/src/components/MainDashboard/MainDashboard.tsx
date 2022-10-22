import cn from "classnames";

import FolderList from "components/FolderList";
import WorkspaceList from "components/WorkspaceList";

import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  return (
    <section className={cn(styles.MainDashboard)}>
      <div className={styles.MainDashboard__fileList}>
        <FolderList />
        <WorkspaceList />
      </div>
    </section>
  );
};

export default MainDashboard;

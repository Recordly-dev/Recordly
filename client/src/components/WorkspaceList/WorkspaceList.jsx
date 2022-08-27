import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import cn from "classnames";
import Workspace from "components/Workspace";

import { fetchWorkspace } from "store/slice/workspcaeSlice";

import styles from "./WorkspaceList.module.scss";

const WorkspaceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store에서 workspaceList 상태 가져오기
  const workspaceList = useSelector((state) => state.workspace.workspaceList);

  useEffect(() => {
    dispatch(fetchWorkspace());
  }, [dispatch]);

  const moveWorkSpacePage = (id) => {
    navigate(`/workspace/${id}`);
  };

  const formatDate = (date) => {
    const filterDate = date.substring(5, 16).split("T");
    const now = new Date();

    const today = [now.getMonth() + 1, now.getDate()].join("");
    const yesterDay = [now.getMonth() + 1, now.getDate() - 1].join("");

    return (
      <div
        className={cn(
          "d-flex",
          "flex-column",
          "justify-content-center",
          "align-items-center"
        )}
      >
        {filterDate.map((v) => {
          if (v.split("-").map(Number).join("") === today) {
            return "오늘";
          } else if (v.split("-").map(Number).join("") === yesterDay) {
            return "어제";
          } else {
            return <span key={v + now}>{v}</span>;
          }
        })}
      </div>
    );
  };

  return (
    <div className={cn(styles.WorkspaceList, "mt-5")}>
      {workspaceList.map((workspace) => (
        <Workspace
          key={workspace._id}
          uid={workspace._id}
          title={workspace.title}
          editedAt={workspace.editedAt}
          moveWorkSpacePage={moveWorkSpacePage}
          formatDate={formatDate}
          fetchWorkspace={fetchWorkspace}
        />
      ))}
    </div>
  );
};

export default WorkspaceList;

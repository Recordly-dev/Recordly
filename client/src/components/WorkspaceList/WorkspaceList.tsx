import React from "react";
import cn from "classnames";

import { useNavigate } from "react-router";

import Workspace from "components/Workspace";
import WorkspaceSkeleton from "components/Skeleton/WorkspaceSkeleton";

import { IWorkspace } from "types/workspace";

/**
 * workspace 시간에 대해 어제,오늘 표시해주는 handler
 */
const formatWorkspaceDate = (
  date: string
): React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> => {
  const [dateString, timeString]: string[] = date.substring(5, 16).split("T");
  const dateToCompare = dateString.split("-").map(Number).join("");

  const now: Date = new Date();
  const today: string = [now.getMonth() + 1, now.getDate()].join("");
  const yesterday: string = [now.getMonth() + 1, now.getDate() - 1].join("");

  let dateLabel = dateString;
  dateLabel = dateToCompare === today ? "Today" : dateLabel;
  dateLabel = dateToCompare === yesterday ? "Yesterday" : dateLabel;

  const dateElement = <span>{dateLabel}</span>;
  const timeElement = <span className={"ms-1"}>{timeString}</span>;

  return (
    <div
      className={cn("d-flex", "justify-content-center", "align-items-center")}
    >
      {dateElement}
      {timeElement}
    </div>
  );
};

const WorkspaceList = ({
  isLoadingData,
  workspaces,
}: {
  isLoadingData: boolean;
  isFavoritesPage?: boolean;
  isTagPage?: boolean;
  isFolderDetailPage?: boolean;
  workspaces?: IWorkspace[];
}) => {
  const navigate = useNavigate();

  const moveWorkSpacePage = (id: string): void => {
    navigate(`/workspace/${id}`);
  };

  return (
    <>
      {isLoadingData
        ? [...Array(50).keys()].map((idx) => (
            <WorkspaceSkeleton key={idx.toString()} />
          ))
        : workspaces?.map((workspace: IWorkspace) => (
            <Workspace
              key={workspace._id}
              uid={workspace._id}
              title={workspace.title}
              folderId={workspace.folder}
              tagList={workspace.tags}
              editedAt={workspace.editedAt}
              createdAt={workspace.createdAt}
              favorites={workspace.favorites}
              moveWorkSpacePage={moveWorkSpacePage}
              formatWorkspaceDate={formatWorkspaceDate}
            />
          ))}
    </>
  );
};

export default WorkspaceList;

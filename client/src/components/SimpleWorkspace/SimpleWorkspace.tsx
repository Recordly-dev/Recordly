import React from "react";
import cn from "classnames";

import styles from "./SimpleWorkspace.module.scss";

import TagPreview from "components/TagPreview";

import CONSTANT from "./constants";

const SimpleWorkspace = ({
  uid,
  title,
  // folderId,
  tagList,
  moveWorkSpacePage,
}: // formatWorkspaceDate,
{
  uid: string;
  title: string;
  // folderId: string | null;
  tagList: any;
  moveWorkSpacePage: Function;
  // formatWorkspaceDate: Function;
}) => {
  /**
   * 썸네일 지정 핸들러
   */
  const setThumbnail = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    e.currentTarget.src = CONSTANT.EMPTY_IMAGE_PATH;
  };

  return (
    <div className={cn(styles.SimpleWorkspace__container)}>
      <div
        className={styles.SimpleWorkspace__docs}
        onClick={() => moveWorkSpacePage(uid)}
      >
        <div className={styles.SimpleWorkspace__docs__top}>
          <img
            className={styles.SimpleWorkspace__docs__top__image}
            src={CONSTANT.IMAGE_PATH(uid)}
            onError={setThumbnail}
            alt="thumbnail"
          />
        </div>
        <div className={styles.SimpleWorkspace__docs__bottom}>
          <div className={cn("d-flex", "align-items-center", "mb-1")}>
            <span className={styles.SimpleWorkspace__title}>{title}</span>
          </div>
          <div
            className={cn("d-flex", "align-items-center", "w-100", "mb-2")}
          ></div>
          <div
            className={cn(
              styles.SimpleWorkspace__tagList,
              "d-flex",
              "align-items-center",
              "w-100"
            )}
          >
            {tagList.map((tag: any) => (
              <TagPreview name={"# " + tag.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkspace;

import styles from "./TagList.module.scss";
import Tag from "components/Tag";

import { ITag } from "types/tag";

const TagList = ({
  tagList,
  currentSeleteTagId,
  tagInputValue,
  getWorkspaceWithTags,
}: {
  tagList: ITag[];
  currentSeleteTagId: string;
  tagInputValue: string;
  getWorkspaceWithTags: Function;
}) => (
  <div className={styles.TagList}>
    {tagList?.map(
      (tag: ITag) =>
        tag.name.includes(tagInputValue) && (
          <Tag
            key={tag?._id}
            id={tag?._id}
            name={tag?.name}
            count={tag?.workspaces?.length}
            currentSeleteTagId={currentSeleteTagId}
            getWorkspaceWithTags={getWorkspaceWithTags}
          />
        )
    )}
  </div>
);

export default TagList;

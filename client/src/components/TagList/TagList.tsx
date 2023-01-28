import styles from "./TagList.module.scss";
import Tag from "components/Tag";

const TagList = ({
  tagList,
  currentSeleteTagId,
  tagInputValue,
}: {
  tagList: any;
  currentSeleteTagId: string;
  tagInputValue: string;
}) => (
  <div className={styles.TagList}>
    {tagList.map(
      (tag: any) =>
        tag.name.includes(tagInputValue) && (
          <Tag
            id={tag?._id}
            name={tag?.name}
            count={tag?.workspaces?.length}
            currentSeleteTagId={currentSeleteTagId}
          />
        )
    )}
  </div>
);

export default TagList;

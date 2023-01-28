import React from "react";
import cn from "classnames";

import { useGetWorkspacesWithTag } from "query-hooks/useFetchWorkspcae";
import { actions as tagListActions } from "store/slice/tagSlice";
import { useDispatch } from "store";

import { Button } from "reactstrap";

import styles from "./Tag.module.scss";

const Tag = ({
  id,
  name,
  count,
  currentSeleteTagId,
}: {
  id: string;
  name: string;
  count: number;
  currentSeleteTagId: string;
}) => {
  const dispatch = useDispatch();
  const { refetch: refetchTags } = useGetWorkspacesWithTag({ tagId: id });

  return (
    <Button
      className={cn({
        [styles.Tag]: true,
        [styles.Tag__active]: currentSeleteTagId === id,
      })}
      color="primary"
      size="md"
      onClick={() => {
        refetchTags();
        dispatch(tagListActions.patchCurrentTagId({ tagId: id }));
      }}
    >
      <span className={styles.Tag__name}>{name}</span>
      <span className={styles.Tag__count}>{count}</span>
    </Button>
  );
};

export default Tag;

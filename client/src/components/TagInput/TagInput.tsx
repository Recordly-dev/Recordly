import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Input } from "reactstrap";

import { usePostTag } from "query-hooks/useFetchTag";

import { actions as tagListActions, setTagList } from "store/slice/tagSlice";

import { useDispatch } from "store";

import styles from "./TagInput.module.scss";

const TagInput = ({ workspaceId }: { workspaceId: string }) => {
  const dispatch = useDispatch();

  const { mutateAsync: mutatePostTag } = usePostTag({ workspaceId });

  const workspace = useSelector(
    (state: any) => state.workspace.workspaceList
  )?.filter((workspace: any) => workspace._id === workspaceId)?.[0];

  useEffect(() => {
    if (workspace) {
      dispatch(setTagList([...workspace.tags]));
    }
  }, []);

  const [tagInputValue, setTagInputValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setTagInputValue(inputValue);
  };

  const postTag = async (name: string, workspaceId: string) => {
    mutatePostTag({ name, workspaceId });

    setTagInputValue("");
  };

  const handleTextFieldKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (e.key) {
      case "Enter": {
        if (tagInputValue.length > 0) {
          postTag(tagInputValue, workspaceId);
        }

        break;
      }
    }
  };

  return (
    <div>
      <Input
        className={styles.TagInput}
        value={tagInputValue}
        onChange={handleInputValue}
        onKeyPress={handleTextFieldKeyPress}
        placeholder="# input Tag"
      />
    </div>
  );
};

export default TagInput;

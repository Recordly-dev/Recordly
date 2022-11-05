import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Input } from "reactstrap";

import { actions as tagListActions, setTagList } from "store/slice/tagSlice";

import { useDispatch } from "store";

const TagInput = ({ workspaceId }: { workspaceId: string }) => {
  const dispatch = useDispatch();

  // TODO: 추천 태그 리스트 사용
  const recommendedTagList = useSelector(
    (state: any) => state.tag.recommendedTagList
  );

  const workspace = useSelector(
    (state: any) => state.workspace.workspaceList
  ).filter((workspace: any) => workspace._id === workspaceId)?.[0];

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
    dispatch(tagListActions.postTag({ name, workspaceId }));
  };

  const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        if (tagInputValue.length > 0) {
          postTag(tagInputValue, workspaceId);
          setTagInputValue("");
        }

        break;
      }
    }
  };

  return (
    <div>
      <Input
        value={tagInputValue}
        onChange={handleInputValue}
        onKeyDown={handleTextFieldKeyDown}
      />
    </div>
  );
};

export default TagInput;

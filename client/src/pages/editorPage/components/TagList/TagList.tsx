import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Input } from "reactstrap";

import { actions as tagListActions } from "store/slice/tagList";

import { useDispatch } from "store";

const TagList = ({ workspaceId }: { workspaceId: string }) => {
  const dispatch = useDispatch();

  // TODO: 추천 태그 리스트 사용
  const recommendedTagList = useSelector(
    (state: any) => state.tag.recommendedTagList
  );

  const [tagInputValue, setTagInputValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setTagInputValue(inputValue);
  };

  const postTagList = async (name: string, workspaceId: string) => {
    dispatch(tagListActions.postTagList({ name, workspaceId }));
  };

  const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        if (tagInputValue.length > 0) {
          postTagList(tagInputValue, workspaceId);
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

export default TagList;

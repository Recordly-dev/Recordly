import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "reactstrap";

import { fetchTagList } from "store/slice/tagListSlice";
import { useDispatch } from "store";

const TagList = ({
  workspaceId,
  getTagList,
}: {
  workspaceId: string | undefined;
  getTagList: Function;
}) => {
  const dispatch = useDispatch();

  const [tagInputValue, setTagInputValue] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setTagInputValue(inputValue);
  };

  const postTagList = async (name: string, workspaceId: string | undefined) => {
    await axios.post("/api/tag", { name: name, workspaceId: workspaceId });
    dispatch(fetchTagList());
    getTagList();
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

  useEffect(() => {
    dispatch(fetchTagList());
  }, []);

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

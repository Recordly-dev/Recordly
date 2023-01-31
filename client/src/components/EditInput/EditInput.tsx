import React, { useState, useRef } from "react";

import { Input } from "reactstrap";

import styles from "./EditInput.module.scss";

const EditInput = ({
  title,
  isWorkspace,
  isFolder,
  patchFolder,
  patchWorkspace,
}: {
  title: string;
  isWorkspace?: boolean;
  isFolder?: boolean;
  patchFolder: Function;
  patchWorkspace: Function;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editInputValue, setEditInputValue] = useState(title);

  const handleEvent = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditInputValue(value);
  };

  const handlePatchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        if (isWorkspace) {
          patchWorkspace(editInputValue);
        } else if (isFolder) {
          patchFolder(editInputValue);
        }

        break;
      }
    }
  };

  return (
    <Input
      className={styles.EditInput}
      innerRef={inputRef}
      value={editInputValue}
      onClick={handleEvent}
      onChange={handleChangeInputValue}
      onKeyDown={(e) => handlePatchKeyDown(e)}
      autoFocus
    />
  );
};

export default EditInput;

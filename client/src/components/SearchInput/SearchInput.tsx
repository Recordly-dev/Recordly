import React from "react";
import { Input } from "reactstrap";
import cn from "classnames";

import SearchIcon from "common/assets/icons/SearchIcon";
import ErrorCircleIcon from "common/assets/icons/ErrorCircleIcon";
import styles from "./SearchInput.module.scss";

import CONSTANT from "./constants";

const SearchInput = ({
  className,
  inputClassName,
  value,
  placeholder,
  setSearchValue,
  onChange,
  onKeyDown,
}: {
  className: string;
  inputClassName: string;
  value: string;
  placeholder: string;
  setSearchValue: Function;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) => {
  const handleCancelClick = () => {
    setSearchValue("");
  };

  return (
    <div className={cn(styles.SearchInput, className)}>
      {!value && (
        <SearchIcon
          className={cn(
            styles.SearchInput__SearchIcon,
            styles[`SearchInput__SearchIcon`]
          )}
          width={CONSTANT.ICON_SIZE}
          height={CONSTANT.ICON_SIZE}
          color="#a9abb8"
        />
      )}
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={cn(
          styles.SearchInput__Input,
          styles[`SearchInput__Input`],
          { [styles[`SearchInput__Input--text`]]: value },
          inputClassName
        )}
        placeholder={placeholder}
      />
      {value && (
        <ErrorCircleIcon
          onClick={handleCancelClick}
          className={cn(
            styles.SearchInput__CancleIcon,
            styles[`SearchInput__CancleIcon`]
          )}
        />
      )}
    </div>
  );
};

export default SearchInput;

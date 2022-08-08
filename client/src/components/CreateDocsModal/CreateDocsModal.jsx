import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  ModalHeader,
} from "reactstrap";

import styles from "./CreateDocsModal.module.scss";

const CreateDocsModal = ({
  isOpen,
  toggle,
  header,
  yesFunction,
  noFunction,
}) => {
  const [title, setTitle] = useState("");
  const [selectdButton, setSelectdButton] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleYesClick = () => {
    yesFunction(title, selectdButton);
  };

  const getSelectedBtnData = (event) => {
    setSelectdButton(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <Input onChange={handleTitleChange} placeholder="제목" />
        <Button onClick={getSelectedBtnData} value="docs">
          메모
        </Button>
        <Button onClick={getSelectedBtnData} value="pdf">
          PDF
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleYesClick}>생성하기</Button>
        <Button onClick={noFunction}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateDocsModal;

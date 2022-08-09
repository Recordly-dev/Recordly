import React from "react";
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
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <Input placeholder="제목" />
      </ModalBody>
      <ModalFooter>
        <Button onClick={yesFunction}>생성하기</Button>
        <Button onClick={noFunction}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateDocsModal;

import React from "react";
import cn from "classnames";

import CloseIcon from "common/assets/icons/CloseIcon";

import styles from "./AlertModal.module.scss";

import CONSTANT from "./constants";

const AlertModal = ({
  showAlertModal,
  children,
}: {
  showAlertModal: any;
  children?: any;
}) => (
  <>
    {showAlertModal && (
      <>
        <div className={styles.AlertModal}>{children}</div>
        <div className={styles.AlertModal__dim} />
      </>
    )}
  </>
);

AlertModal.EmptyHeader = () => (
  <header className={styles.AlertModal__emptyHeader} />
);

AlertModal.Header = ({
  closeAlertModal,
  children,
}: {
  closeAlertModal: any;
  children?: any;
}) => (
  <header className={styles.AlertModal__header}>
    <button
      type="button"
      className={styles.AlertModal__closeButton}
      onClick={closeAlertModal}
    >
      <CloseIcon width={CONSTANT.ICON_SIZE} height={CONSTANT.ICON_SIZE} />
    </button>
  </header>
);

AlertModal.Body = ({ children }: { children?: any }) => (
  <section className={styles.AlertModal__body}>{children}</section>
);

AlertModal.Footer = ({
  className,
  children,
}: {
  className?: any;
  children?: any;
}) => (
  <footer className={cn(styles.AlertModal__footer, className)}>
    {children}
  </footer>
);

export default AlertModal;

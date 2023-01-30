import cn from "classnames";

import { Button } from "reactstrap";

import styles from "./Header.module.scss";
const Header = ({
  onMoveToElement,
}: {
  onMoveToElement: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <header
    className={cn(
      styles.Header,
      "d-flex",
      "justify-content-center",
      "align-items-center"
    )}
  >
    <div
      className={cn(
        styles.Header__container,
        "d-flex",
        "align-items-center",
        "justify-content-between",
        "ps-4",
        "pe-4"
      )}
    >
      <div
        className={cn(
          styles.Header__container__left,
          "d-flex",
          "align-items-center",
          "justify-content-center"
        )}
      >
        <span className={styles.Header__container__title}>Recordly</span>
      </div>
      <div
        className={cn(
          styles.Header__container__right,
          "d-flex",
          "align-items-center",
          "justify-content-center"
        )}
      >
        <Button
          onClick={onMoveToElement}
          className={cn(styles.Header__right__button)}
        >
          Get Started
        </Button>
      </div>
    </div>
  </header>
);

export default Header;

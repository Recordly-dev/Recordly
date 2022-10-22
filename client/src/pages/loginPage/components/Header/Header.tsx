import cn from "classnames";

import { useNavigate } from "react-router";

import styles from "./Header.module.scss";
const Header = ({ imageUrl }: { imageUrl?: string }) => {
  // const [selectNavi, setSelectNavi] = useState("intro");

  return (
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
          {/* Todo: 로고 생기면 넣기 */}
          {/* <img src={imageUrl} className={styles.Header__image} alt="logoImage" /> */}
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
          <button
            className={cn(
              styles.Header__container__right__button
              // selectNavi === "intro" &&
              // styles.Header__container__right__active,
            )}
          >
            소개
          </button>
          <button
            className={cn(
              styles.Header__container__right__button
              // selectNavi === "notice" &&
              // styles.Header__container__right__active,
            )}
          >
            공지사항
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

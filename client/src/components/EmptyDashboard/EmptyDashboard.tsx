import React from "react";
import cn from 'classnames';
import styles from "./EmptyDashboard.module.scss";

import emptyImage from "./assets/images/emptyDocs.svg";

const EmptyDashboard = ({
  isTagPage,
  isFavoritesPage,
}: {
  isTagPage?: boolean;
  isFavoritesPage?: boolean;
}) => {
  let emptyText;
  if (isTagPage) {
    emptyText = "Tags";
  } else if (isFavoritesPage) {
    emptyText = "Favorites Memo";
  } else {
    emptyText = "Dashboard";
  }

  return (
    <div className={cn(styles.EmptyDashboard, {
      [styles.EmptyDashboard__tag]: isTagPage
    })}>
      <img
        className={styles.EmptyDashboard__image}
        src={emptyImage}
        alt="empty status"
      />
      <span className={styles.EmptyDashboard__text}>Empty {emptyText}</span>
    </div>
  );
};

export default EmptyDashboard;

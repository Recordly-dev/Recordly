import { useState, useEffect } from "react";
import cn from "classnames";
import { Transition } from "react-transition-group";

import styles from "./Sidebar.module.scss";

const DEFAULT_TRANSITION_STYLE: any = {
  entering: styles.Sidebar_entering,
  entered: styles.Sidebar_entered,
  exiting: styles.Sidebar_exiting,
  exited: styles.Sidebar_exited,
};

const Sidebar = ({ isOpen, children }: { isOpen: boolean; children: any }) => {
  const [mount, setMount] = useState(false);

  const doMount = (isOpen: boolean) => {
    if (isOpen) {
      setMount(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const doUnmount = (isOpen: boolean) => {
    if (!isOpen) {
      setMount(false);
    }
  };

  const transitionExitedHandler = () => {
    doUnmount(isOpen);
  };

  useEffect(() => {
    doMount(isOpen);

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return mount ? (
    <>
      <Transition
        in={isOpen}
        appear
        timeout={{ enter: 0, exit: 100 }}
        onExited={transitionExitedHandler}
      >
        {(status) => (
          <div className={cn(styles.Sidebar, DEFAULT_TRANSITION_STYLE[status])}>
            {children}
          </div>
        )}
      </Transition>
    </>
  ) : (
    <></>
  );
};

export default Sidebar;

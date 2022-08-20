import { useContext, useEffect, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

function useBlocker(blocker, when = true, callback) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;
    // callback();
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(message, when = true, callback) {
  const blocker = useCallback(
    (tx) => {
      //   eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
      callback();
    },
    [message]
  );

  useBlocker(blocker, when, callback);
}

import { useEffect } from "react";

function useInputOnClickOutside(ref, handler, isPatch) {
  useEffect(() => {
    ref?.current?.focus();
    if (isPatch) {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }
  }, [handler, isPatch, ref]);
}

export default useInputOnClickOutside;

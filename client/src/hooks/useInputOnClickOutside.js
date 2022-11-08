import { useEffect } from "react";

function useInputOnClickOutside(ref, handler, isPatch) {
  useEffect(() => {
    console.log(isPatch);
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
  }, [isPatch]);
}

export default useInputOnClickOutside;

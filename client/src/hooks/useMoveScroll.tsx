import { useRef } from "react";

function useMoveScrool() {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return { element, onMoveToElement };
}

export default useMoveScrool;

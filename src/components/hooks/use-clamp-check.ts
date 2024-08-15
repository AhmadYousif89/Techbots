import { useEffect, useState, useRef } from "react";

export function useClampCheck<T extends HTMLElement>(body: string) {
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<T | null>(null);

  const checkClamping = () => {
    if (!contentRef.current) return;
    if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
      setIsClamped(true);
    } else {
      setIsClamped(false);
    }
  };

  useEffect(() => {
    checkClamping();
    window.addEventListener("resize", checkClamping);

    return () => {
      window.removeEventListener("resize", checkClamping);
    };
  }, [body]);

  return { isClamped, contentRef };
}

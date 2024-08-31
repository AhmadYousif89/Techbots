import { useEffect, useState, RefObject } from "react";

export function useClampCheck<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  body: string,
) {
  const [isClamped, setIsClamped] = useState(false);

  const checkClamping = () => {
    if (!ref.current) return;
    if (ref.current.scrollHeight > ref.current.clientHeight) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return { isClamped };
}

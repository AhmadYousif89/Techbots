import { useState, useCallback, useMemo } from "react";

export function useImageZoom<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>,
  zoomFactor = 2,
) {
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handlePointerEnter = useCallback(() => setShowZoom(true), []);
  const handlePointerLeave = useCallback(() => setShowZoom(false), []);
  const handlePointerMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (elementRef.current) {
        const { left, top, width, height } =
          elementRef.current.getBoundingClientRect();
        setImageSize({ width, height });
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    },
    [elementRef],
  );

  return useMemo(
    () => ({
      showZoom,
      zoomFactor,
      imageSize,
      mousePosition,
      handlePointerEnter,
      handlePointerLeave,
      handlePointerMove,
    }),
    [
      showZoom,
      zoomFactor,
      imageSize,
      mousePosition,
      handlePointerEnter,
      handlePointerLeave,
      handlePointerMove,
    ],
  );
}

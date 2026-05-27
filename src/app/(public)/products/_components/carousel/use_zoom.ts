import { useState, useCallback, useMemo } from "react";

type UseImageZoomOptions = {
  edgePadding?: number;
};

export function useImageZoom<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>,
  options: UseImageZoomOptions = {},
  zoomFactor = 2,
) {
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const edgePadding = options.edgePadding ?? 0;

  const updatePointerPosition = useCallback(
    (e: React.PointerEvent<T>) => {
      if (elementRef.current) {
        const { left, top, width, height } =
          elementRef.current.getBoundingClientRect();
        const safeWidth = Math.max(width - edgePadding * 2, 1);
        const safeHeight = Math.max(height - edgePadding * 2, 1);
        const pointerX = Math.min(
          Math.max(e.clientX - left, edgePadding),
          width - edgePadding,
        );
        const pointerY = Math.min(
          Math.max(e.clientY - top, edgePadding),
          height - edgePadding,
        );
        const x = ((pointerX - edgePadding) / safeWidth) * 100;
        const y = ((pointerY - edgePadding) / safeHeight) * 100;

        setImageSize({ width, height });
        setMousePosition({ x, y });
      }
    },
    [edgePadding, elementRef],
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<T>) => {
      setShowZoom(true);
      updatePointerPosition(e);
    },
    [updatePointerPosition],
  );

  const handlePointerLeave = useCallback(() => {
    setShowZoom(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!showZoom) return;
      updatePointerPosition(e);
    },
    [showZoom, updatePointerPosition],
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

import { Image } from "@unpic/react";
import { memo, useMemo, useRef, CSSProperties } from "react";

import { useImageZoom } from "./use_zoom";
import { cn } from "@/lib/utils";

type ImageZoomProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  edgePadding?: number;
};

export const ProductImageZoom = memo(
  ({
    src,
    width,
    height,
    alt = "Product image",
    edgePadding = 40,
  }: ImageZoomProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {
      showZoom,
      zoomFactor,
      imageSize,
      mousePosition,
      handlePointerEnter,
      handlePointerLeave,
      handlePointerMove,
    } = useImageZoom(wrapperRef, { edgePadding });

    const zoomWidth = Math.max(imageSize.width - edgePadding * 2, 1);
    const zoomHeight = Math.max(imageSize.height - edgePadding * 2, 1);

    const zoomStyle = useMemo<CSSProperties>(
      () => ({
        top: edgePadding,
        left: edgePadding,
        width: zoomWidth,
        height: zoomHeight,
        position: "absolute",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${zoomFactor * 100}%`,
        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
      }),

      [
        src,
        edgePadding,
        mousePosition.x,
        mousePosition.y,
        zoomFactor,
        zoomHeight,
        zoomWidth,
      ],
    );

    return (
      <div
        ref={wrapperRef}
        className={cn(
          "relative flex items-center justify-center border-2 border-dashed transition-colors",
          showZoom
            ? "cursor-zoom-out lg:border-border"
            : "cursor-zoom-in border-transparent",
        )}
        style={{ padding: edgePadding, margin: -edgePadding }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <Image
          alt={alt}
          src={src}
          width={width}
          height={height}
          draggable={false}
          className="object-contain max-[500px]:pointer-events-none"
          style={{ maxHeight: height }}
        />
        {showZoom && (
          <div
            className="pointer-events-none rounded border shadow"
            style={zoomStyle}
          />
        )}
      </div>
    );
  },
);

ProductImageZoom.displayName = "ProductImageZoom";

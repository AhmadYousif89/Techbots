import Image from "next/image";
import { memo, useMemo, useRef, CSSProperties } from "react";

import { useImageZoom } from "./use_zoom";

type ImageZoomProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export const ProductImageZoom = memo(
  ({ src, width, height, alt = "Product image" }: ImageZoomProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const {
      showZoom,
      zoomFactor,
      imageSize,
      mousePosition,
      handlePointerEnter,
      handlePointerLeave,
      handlePointerMove,
    } = useImageZoom(imageRef);

    const zoomStyle = useMemo<CSSProperties>(
      () => ({
        width: imageSize.width,
        height: imageSize.height,
        position: "absolute",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${zoomFactor * 100}%`,
        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
      }),
      [
        width,
        height,
        src,
        mousePosition.x,
        mousePosition.y,
        zoomFactor,
        imageSize.width,
        imageSize.height,
      ],
    );

    return (
      <div className="relative flex cursor-zoom-in items-center justify-center">
        <Image
          ref={imageRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          alt={alt}
          src={src}
          width={width}
          height={height}
          draggable={false}
          className="object-contain"
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

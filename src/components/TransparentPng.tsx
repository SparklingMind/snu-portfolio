"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  // remove pixels close to black
  threshold?: number; // 0..255
};

export default function TransparentPng({
  src,
  alt,
  className,
  threshold = 28,
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const key = useMemo(() => `${src}::${threshold}`, [src, threshold]);

  useEffect(() => {
    let cancelled = false;
    setDataUrl(null);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        // simple near-black key
        if (r < threshold && g < threshold && b < threshold) {
          d[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const out = canvas.toDataURL("image/png");
      if (!cancelled) setDataUrl(out);
    };

    return () => {
      cancelled = true;
    };
  }, [key, src, threshold]);

  return (
    <img
      src={dataUrl ?? src}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}


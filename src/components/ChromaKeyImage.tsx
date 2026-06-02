"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  // remove near-white/near-gray background (checkerboard)
  lightnessThreshold?: number; // 0..255, higher = more aggressive
  chromaThreshold?: number; // 0..255, lower = more gray-only
};

function max3(a: number, b: number, c: number) {
  return Math.max(a, Math.max(b, c));
}
function min3(a: number, b: number, c: number) {
  return Math.min(a, Math.min(b, c));
}

export default function ChromaKeyImage({
  src,
  alt,
  className,
  lightnessThreshold = 228,
  chromaThreshold = 22,
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const key = useMemo(
    () => `${src}::${lightnessThreshold}::${chromaThreshold}`,
    [src, lightnessThreshold, chromaThreshold],
  );

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
        const a = d[i + 3];
        if (a === 0) continue;

        const mx = max3(r, g, b);
        const mn = min3(r, g, b);
        const chroma = mx - mn;
        // treat very light + low-chroma pixels as background
        if (mx >= lightnessThreshold && chroma <= chromaThreshold) {
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
  }, [key, src, lightnessThreshold, chromaThreshold]);

  return (
    <img
      src={dataUrl ?? src}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}


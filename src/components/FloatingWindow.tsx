"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import RetroWindow from "@/components/RetroWindow";

type WindowId = "portfolio" | "services" | "contact";

type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type ResizeDir =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

const MIN_W = 520;
const MIN_H = 320;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getViewportBounds() {
  const pad = 16;
  const taskbarH = 52;
  return {
    left: pad,
    top: 32,
    right: window.innerWidth - pad,
    bottom: window.innerHeight - taskbarH - pad,
  };
}

function fitToViewport(r: Rect): Rect {
  const b = getViewportBounds();
  const maxW = Math.max(MIN_W, b.right - b.left);
  const maxH = Math.max(MIN_H, b.bottom - b.top);
  const w = clamp(r.w, MIN_W, maxW);
  const h = clamp(r.h, MIN_H, maxH);
  const x = clamp(r.x, b.left, b.right - w);
  const y = clamp(r.y, b.top, b.bottom - h);
  return { x, y, w, h };
}

function defaultRect(): Rect {
  const b = getViewportBounds();
  const w = Math.min(920, b.right - b.left);
  const h = Math.min(620, b.bottom - b.top);
  const x = Math.round((b.left + b.right - w) / 2);
  const y = Math.round((b.top + b.bottom - h) / 2);
  return { x, y, w, h };
}

export default function FloatingWindow({
  id,
  title,
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
  children,
}: {
  id: WindowId;
  title: string;
  isMaximized: boolean;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const [rect, setRect] = useState<Rect>(() => defaultRect());
  const dragRef = useRef<
    | {
        pointerId: number;
        startX: number;
        startY: number;
        startRect: Rect;
      }
    | undefined
  >(undefined);
  const resizeRef = useRef<
    | {
        pointerId: number;
        dir: ResizeDir;
        startX: number;
        startY: number;
        startRect: Rect;
      }
    | undefined
  >(undefined);

  // Ensure rect stays sane on viewport resize.
  useEffect(() => {
    const onResize = () => setRect((r) => fitToViewport(r));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // When a different window opens, gently re-center once.
  useEffect(() => {
    setRect((r) => fitToViewport(r.x === 0 && r.y === 0 ? defaultRect() : r));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const wrapperStyle = useMemo(() => {
    if (isMaximized) return undefined;
    return {
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
    } as const;
  }, [isMaximized, rect.h, rect.w, rect.x, rect.y]);

  const containerClassName = useMemo(() => {
    if (isMaximized) {
      return "fixed left-4 right-4 top-8 bottom-[68px] z-50";
    }
    return "fixed z-50";
  }, [isMaximized]);

  const onTitlebarPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (isMaximized) return;
    // ignore if a button started the interaction
    const el = e.target as HTMLElement | null;
    if (el && el.closest("button")) return;

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startRect: rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onTitlebarPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    setRect(() => fitToViewport({ ...d.startRect, x: d.startRect.x + dx, y: d.startRect.y + dy }));
  };

  const onTitlebarPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    dragRef.current = undefined;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    e.stopPropagation();
    resizeRef.current = {
      pointerId: e.pointerId,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startRect: rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = resizeRef.current;
    if (!r || r.pointerId !== e.pointerId) return;

    const dx = e.clientX - r.startX;
    const dy = e.clientY - r.startY;
    const s = r.startRect;
    let next: Rect = { ...s };

    const hasN = r.dir.includes("n");
    const hasS = r.dir.includes("s");
    const hasW = r.dir.includes("w");
    const hasE = r.dir.includes("e");

    if (hasE) next.w = s.w + dx;
    if (hasS) next.h = s.h + dy;
    if (hasW) {
      next.w = s.w - dx;
      next.x = s.x + dx;
    }
    if (hasN) {
      next.h = s.h - dy;
      next.y = s.y + dy;
    }

    next = fitToViewport(next);
    setRect(next);
  };

  const onResizeUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = resizeRef.current;
    if (!r || r.pointerId !== e.pointerId) return;
    resizeRef.current = undefined;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className={containerClassName} style={wrapperStyle}>
      <RetroWindow
        title={title}
        className="h-full"
        contentClassName="h-full overflow-auto"
        onMinimize={onMinimize}
        onMaximize={onToggleMaximize}
        onClose={onClose}
        onTitlebarPointerDown={onTitlebarPointerDown}
        onTitlebarPointerMove={onTitlebarPointerMove}
        onTitlebarPointerUp={onTitlebarPointerUp}
      >
        {children}
      </RetroWindow>

      {/* Resize handles */}
      {isMaximized ? null : (
        <>
          <div
            className="absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize"
            onPointerDown={startResize("w")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute -right-1 top-0 bottom-0 w-2 cursor-ew-resize"
            onPointerDown={startResize("e")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute left-0 right-0 -top-1 h-2 cursor-ns-resize"
            onPointerDown={startResize("n")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute left-0 right-0 -bottom-1 h-2 cursor-ns-resize"
            onPointerDown={startResize("s")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute -left-1 -top-1 h-3 w-3 cursor-nwse-resize"
            onPointerDown={startResize("nw")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute -right-1 -top-1 h-3 w-3 cursor-nesw-resize"
            onPointerDown={startResize("ne")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute -left-1 -bottom-1 h-3 w-3 cursor-nesw-resize"
            onPointerDown={startResize("sw")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
          <div
            className="absolute -right-1 -bottom-1 h-3 w-3 cursor-nwse-resize"
            onPointerDown={startResize("se")}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
        </>
      )}
    </div>
  );
}


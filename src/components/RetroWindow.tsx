import type { ReactNode } from "react";

export default function RetroWindow({
  title,
  children,
  className,
  rightSlot,
  contentClassName,
  onMinimize,
  onMaximize,
  onClose,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
  contentClassName?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}) {
  return (
    <section className={`retro-window overflow-hidden ${className ?? ""}`}>
      <header className="retro-titlebar flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-[2px] bg-black/20" />
          <h2 className="text-[18px] leading-none tracking-wide">{title}</h2>
        </div>
        <div className="flex items-center gap-1">
          {rightSlot}
          <button
            type="button"
            className="retro-titlebar-button"
            aria-label="Minimize"
            onClick={onMinimize}
          >
            <span className="block h-[2px] w-2 bg-black/70" />
          </button>
          <button
            type="button"
            className="retro-titlebar-button"
            aria-label="Maximize"
            onClick={onMaximize}
          >
            <span className="block h-2 w-2 border-2 border-black/70" />
          </button>
          <button
            type="button"
            className="retro-titlebar-button"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="relative block h-2 w-2">
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/70" />
              <span className="absolute left-1/2 top-1/2 block h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black/70" />
            </span>
          </button>
        </div>
      </header>
      <div className={`p-4 ${contentClassName ?? ""}`}>{children}</div>
    </section>
  );
}


"use client";

import { useEffect, useMemo, useState } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Taskbar({
  isMenuOpen,
  onToggleMenu,
}: {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeText = useMemo(() => {
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const isPM = h >= 12;
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:${pad2(m)}:${pad2(s)} ${isPM ? "PM" : "AM"}`;
  }, [now]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50">
      <div className="h-[52px] border-t-2 border-black/15 bg-[var(--taskbar)] shadow-[0_-1px_0_var(--taskbar-border)]">
        <div className="flex h-full w-full items-center px-4">
          <button
            type="button"
            className="retro-button h-9 px-4 text-[18px] tracking-wide"
            aria-expanded={isMenuOpen}
            aria-controls="start-menu"
            onClick={onToggleMenu}
          >
            MENU
          </button>
          <div className="flex-1 px-3 text-center text-[18px] tracking-wide text-black/70">
            <span className="taskbar-sway">***turning data into insight***</span>
          </div>
          <div className="flex items-center gap-2 border-l border-black/20 pl-3 text-[18px] tracking-wide">
            <span>{timeText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


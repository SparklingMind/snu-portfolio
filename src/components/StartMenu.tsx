"use client";

export default function StartMenu({
  open,
  onSelect,
}: {
  open: boolean;
  onSelect: (id: "portfolio" | "services" | "contact") => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-[52px] left-4 z-50" id="start-menu">
      <div className="retro-window w-[220px] overflow-hidden">
        <div className="flex">
          <div className="w-7 bg-[#f2a9b3] text-black/70">
            <div className="h-full w-full [writing-mode:vertical-rl] rotate-180 px-1 py-2 text-[18px] tracking-wide">
              menu
            </div>
          </div>
          <div className="flex-1 p-2">
            <button
              type="button"
              className="w-full rounded-[2px] px-2 py-2 text-left text-[18px] hover:bg-black/5"
              onClick={() => onSelect("portfolio")}
            >
              PORTFOLIO
            </button>
            <button
              type="button"
              className="w-full rounded-[2px] px-2 py-2 text-left text-[18px] hover:bg-black/5"
              onClick={() => onSelect("services")}
            >
              SERVICES
            </button>
            <button
              type="button"
              className="w-full rounded-[2px] px-2 py-2 text-left text-[18px] hover:bg-black/5"
              onClick={() => onSelect("contact")}
            >
              CONTACT
            </button>
            <div className="my-2 border-t border-black/15" />
            <div className="px-2 py-2 text-[18px] text-black/55">CREDITS</div>
            <div className="px-2 py-2 text-[18px] text-black/55">SHUT DOWN</div>
          </div>
        </div>
      </div>
    </div>
  );
}


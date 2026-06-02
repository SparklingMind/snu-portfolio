const items = [
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "services", label: "SERVICES" },
  { id: "contact", label: "CONTACT" },
] as const;

export type SidebarItemId = (typeof items)[number]["id"];

function Icon({
  variant,
}: {
  variant: "doc" | "pen" | "mail";
}) {
  const box = "grid place-items-center rounded-[2px] bg-[#c4c2a2] shadow-[2px_2px_0_rgba(0,0,0,0.18)]";
  const size = "h-[clamp(36px,4.5vw,44px)] w-[clamp(36px,4.5vw,44px)]";
  if (variant === "doc") {
    return (
      <div className={`${box} ${size}`}>
        <div className="h-[clamp(18px,2.6vw,24px)] w-[clamp(18px,2.6vw,24px)] rounded-[2px] border-2 border-black/30 bg-[#e8e7d2]" />
      </div>
    );
  }
  if (variant === "pen") {
    return (
      <div className={`${box} ${size}`}>
        <div className="h-[clamp(3px,0.7vw,4px)] w-[clamp(22px,3.4vw,28px)] rotate-[-30deg] rounded bg-[#b34ee2]" />
      </div>
    );
  }
  return (
    <div className={`${box} ${size}`}>
      <div className="h-[clamp(14px,2.3vw,20px)] w-[clamp(22px,3.4vw,28px)] rounded-[2px] border-2 border-black/30 bg-[#b34ee2]" />
    </div>
  );
}

export default function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: SidebarItemId;
  onSelect: (id: SidebarItemId) => void;
}) {
  return (
    <aside className="fixed left-4 top-8 z-20 w-[clamp(76px,10vw,92px)]">
      <nav className="flex flex-col gap-[clamp(14px,2.6vw,20px)]">
        <button
          type="button"
          className="group flex flex-col items-start gap-2 text-left"
          onClick={() => onSelect("portfolio")}
          aria-current={activeId === "portfolio"}
        >
          <Icon variant="doc" />
          <span className="px-1 text-[clamp(16px,2.2vw,18px)] tracking-wide text-black/75">
            PORTFOLIO
          </span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-start gap-2 text-left"
          onClick={() => onSelect("services")}
          aria-current={activeId === "services"}
        >
          <Icon variant="pen" />
          <span className="px-1 text-[clamp(16px,2.2vw,18px)] tracking-wide text-black/75">
            SERVICES
          </span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-start gap-2 text-left"
          onClick={() => onSelect("contact")}
          aria-current={activeId === "contact"}
        >
          <Icon variant="mail" />
          <span className="px-1 text-[clamp(16px,2.2vw,18px)] tracking-wide text-black/75">
            CONTACT
          </span>
        </button>
      </nav>
    </aside>
  );
}


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
  if (variant === "doc") {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-[2px] bg-[#c4c2a2] shadow-[2px_2px_0_rgba(0,0,0,0.18)]">
        <div className="h-6 w-6 rounded-[2px] border-2 border-black/30 bg-[#e8e7d2]" />
      </div>
    );
  }
  if (variant === "pen") {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-[2px] bg-[#c4c2a2] shadow-[2px_2px_0_rgba(0,0,0,0.18)]">
        <div className="h-1 w-7 rotate-[-30deg] rounded bg-[#b34ee2]" />
      </div>
    );
  }
  return (
    <div className="grid h-11 w-11 place-items-center rounded-[2px] bg-[#c4c2a2] shadow-[2px_2px_0_rgba(0,0,0,0.18)]">
      <div className="h-5 w-7 rounded-[2px] border-2 border-black/30 bg-[#b34ee2]" />
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
    <aside className="fixed left-4 top-8 z-40 w-[92px]">
      <nav className="flex flex-col gap-5">
        <button
          type="button"
          className="group flex flex-col items-start gap-2 text-left"
          onClick={() => onSelect("portfolio")}
          aria-current={activeId === "portfolio"}
        >
          <Icon variant="doc" />
          <span className="px-1 text-[18px] tracking-wide text-black/75">
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
          <span className="px-1 text-[18px] tracking-wide text-black/75">
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
          <span className="px-1 text-[18px] tracking-wide text-black/75">
            CONTACT
          </span>
        </button>
      </nav>
    </aside>
  );
}


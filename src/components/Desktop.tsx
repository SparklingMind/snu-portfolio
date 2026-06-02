"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Sidebar, { type SidebarItemId } from "@/components/Sidebar";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import FloatingWindow from "@/components/FloatingWindow";
import { portfolio } from "@/lib/portfolio";

function ArcLogo() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center px-4">
      <div className="relative w-[clamp(380px,55vw,640px)]">
        <svg
          viewBox="0 0 640 260"
          className="mx-auto h-auto w-full"
          aria-hidden="true"
        >
          <path
            id="arcPath"
            d="M80,190 C200,50 440,50 560,190"
            fill="none"
          />
          <text fill="rgba(0,0,0,0.55)" fontSize="28" letterSpacing="6">
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
              NETWORKS · IDENTITY · AFFECT
            </textPath>
          </text>
        </svg>
        <div className="mx-auto -mt-10 w-[clamp(200px,30vw,320px)]">
          <Image
            src="/cats/crown-cat.png"
            alt="Crown cat"
            width={700}
            height={700}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function Desktop() {
  const [active, setActive] = useState<SidebarItemId | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const windowTitle = useMemo(() => {
    if (!active) return "Desktop";
    if (active === "portfolio") return "Portfolio";
    if (active === "services") return "Services";
    return "Contact";
  }, [active]);

  return (
    <div className="relative flex-1 pb-[52px]">
      <Sidebar
        activeId={active ?? "portfolio"}
        onSelect={(id) => {
          setActive(id);
          setIsMaximized(false);
          setMenuOpen(false);
        }}
      />

      <ArcLogo />

      <div className="pointer-events-none fixed right-4 top-2 z-20">
        <div className="retro-window px-3 py-2">
          <div className="text-[18px] tracking-wide text-black/75">
            Active: {windowTitle}
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-[1200px] px-4 pt-8">
        <div className={active ? "ml-0 w-full" : "ml-[116px] w-full"}>
          {active === "portfolio" && (
            <FloatingWindow
              id="portfolio"
              title="Portfolio"
              isMaximized={isMaximized}
              onMinimize={() => setActive(null)}
              onToggleMaximize={() => setIsMaximized((v) => !v)}
              onClose={() => setActive(null)}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_260px]">
                <div className="space-y-4">
                  <div>
                    <div className="text-[34px] leading-none tracking-wide">
                      {portfolio.name}
                    </div>
                    <div className="mt-1 text-[20px] tracking-wide text-black/60">
                      {portfolio.role}
                    </div>
                  </div>

                  <section className="space-y-2">
                    <div className="text-[22px] tracking-wide">Profile</div>
                    <p className="text-[20px] leading-7 text-black/80">
                      {portfolio.profile}
                    </p>
                  </section>

                  <section className="space-y-2">
                    <div className="text-[22px] tracking-wide">
                      Research Interests
                    </div>
                    <p className="text-[20px] leading-7 text-black/80">
                      {portfolio.researchInterests}
                    </p>
                  </section>

                  <section className="space-y-2">
                    <div className="text-[22px] tracking-wide">Skills</div>
                    <div className="grid gap-2">
                      {portfolio.skills.map((s) => (
                        <div
                          key={s.name}
                          className="flex items-center justify-between border-b border-black/10 pb-1"
                        >
                          <span className="text-[20px]">{s.name}</span>
                          <span className="text-[20px] tracking-wider">
                            {s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="space-y-4">
                  <section className="retro-window p-2">
                    <Image
                      src="/cats/crown-cat.png"
                      alt="Crown cat"
                      width={500}
                      height={500}
                      className="h-auto w-full object-contain"
                    />
                  </section>
                  <section className="retro-window p-3">
                    <div className="text-[22px] tracking-wide">Contact</div>
                    <div className="mt-2 grid gap-1 text-[20px] text-black/80">
                      <div>
                        <span className="text-black/55">Phone</span>{" "}
                        {portfolio.contact.phone}
                      </div>
                      <div>
                        <span className="text-black/55">Email</span>{" "}
                        {portfolio.contact.email}
                      </div>
                      <div>
                        <span className="text-black/55">Website</span>{" "}
                        {portfolio.contact.website}
                      </div>
                      <div>
                        <span className="text-black/55">Location</span>{" "}
                        {portfolio.contact.location}
                      </div>
                    </div>
                  </section>

                  <section className="retro-window p-3">
                    <div className="text-[22px] tracking-wide">Languages</div>
                    <div className="mt-2 grid gap-1 text-[20px] text-black/80">
                      {portfolio.languages.map((l) => (
                        <div
                          key={l.name}
                          className="flex items-center justify-between"
                        >
                          <span>{l.name}</span>
                          <span className="tracking-wider">{l.level}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </FloatingWindow>
          )}

          {active === "services" && (
            <FloatingWindow
              id="services"
              title="Services"
              isMaximized={isMaximized}
              onMinimize={() => setActive(null)}
              onToggleMaximize={() => setIsMaximized((v) => !v)}
              onClose={() => setActive(null)}
            >
              <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                <section className="space-y-2">
                  <div className="text-[22px] tracking-wide">Work Experience</div>
                  <div className="space-y-3">
                    {portfolio.workExperience.map((w) => (
                      <article key={`${w.org}-${w.period}`} className="space-y-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="text-[22px]">
                            {w.org}{" "}
                            <span className="text-black/55">| {w.title}</span>
                          </div>
                          <div className="text-[18px] text-black/55">
                            {w.period}
                          </div>
                        </div>
                        <p className="text-[20px] leading-7 text-black/80">
                          {w.summary}
                        </p>
                        <div className="border-b border-black/10 pt-2" />
                      </article>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <div className="text-[22px] tracking-wide">Educations</div>
                  <section className="retro-window p-2">
                    <Image
                      src="/cats/world-cats.png"
                      alt="Cats around the world"
                      width={700}
                      height={900}
                      className="h-auto w-full object-cover"
                    />
                  </section>
                  <div className="space-y-3">
                    {portfolio.educations.map((e) => (
                      <article key={`${e.school}-${e.period}`} className="space-y-1">
                        <div className="text-[22px]">
                          {e.degree}{" "}
                          <span className="text-black/55">
                            | {e.school} | {e.major}
                          </span>
                        </div>
                        <div className="text-[18px] text-black/55">
                          {e.period}
                        </div>
                        <div className="border-b border-black/10 pt-2" />
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </FloatingWindow>
          )}

          {active === "contact" && (
            <FloatingWindow
              id="contact"
              title="Contact"
              isMaximized={isMaximized}
              onMinimize={() => setActive(null)}
              onToggleMaximize={() => setIsMaximized((v) => !v)}
              onClose={() => setActive(null)}
            >
              <div className="grid gap-4 md:grid-cols-[260px_1fr]">
                <section className="retro-window p-2">
                  <Image
                    src="/cats/cool-cat.png"
                    alt="Cool cat"
                    width={700}
                    height={700}
                    className="h-auto w-full object-contain"
                  />
                </section>
                <div className="space-y-3 text-[20px] text-black/80">
                  <div className="text-[26px] tracking-wide">{portfolio.name}</div>
                <div className="grid gap-1">
                  <div>
                    <span className="text-black/55">Phone</span>{" "}
                    {portfolio.contact.phone}
                  </div>
                  <div>
                    <span className="text-black/55">Email</span>{" "}
                    {portfolio.contact.email}
                  </div>
                  <div>
                    <span className="text-black/55">Website</span>{" "}
                    {portfolio.contact.website}
                  </div>
                  <div>
                    <span className="text-black/55">Location</span>{" "}
                    {portfolio.contact.location}
                  </div>
                </div>
              </div>
              </div>
            </FloatingWindow>
          )}
        </div>
      </main>

      <StartMenu
        open={menuOpen}
        onSelect={(id) => {
          setActive(id);
          setIsMaximized(false);
          setMenuOpen(false);
        }}
      />
      <Taskbar
        isMenuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
    </div>
  );
}


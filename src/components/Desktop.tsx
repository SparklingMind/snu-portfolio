"use client";

import { useMemo, useState } from "react";
import Sidebar, { type SidebarItemId } from "@/components/Sidebar";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import FloatingWindow from "@/components/FloatingWindow";
import { portfolio } from "@/lib/portfolio";

function ArcLogo() {
  return (
    <div className="pointer-events-none absolute right-[260px] top-[160px] hidden select-none md:block">
      <div className="relative h-[260px] w-[420px]">
        <svg
          viewBox="0 0 420 260"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            id="arcPath"
            d="M60,165 C135,50 285,50 360,165"
            fill="none"
          />
          <text fill="rgba(0,0,0,0.55)" fontSize="24" letterSpacing="6">
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
              CATS WITH JOBS
            </textPath>
          </text>
        </svg>
        <div className="absolute left-1/2 top-[120px] -translate-x-1/2">
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18 68c2-18 10-30 27-32 17-2 25 14 27 32 1 11-7 16-27 16S17 79 18 68Z"
              fill="#111"
            />
            <path
              d="M28 40l-8-14 10 6 5 10-7-2Z"
              fill="#111"
            />
            <path
              d="M62 40l8-14-10 6-5 10 7-2Z"
              fill="#111"
            />
            <path d="M58 62c10 2 12-10 10-18" stroke="#111" strokeWidth="5" />
          </svg>
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

      {active ? null : <ArcLogo />}

      <main className="mx-auto flex max-w-[1200px] px-4 pt-8">
        <div className="ml-[116px] w-full">
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
            </FloatingWindow>
          )}

          <div className="mt-4 text-[18px] tracking-wide text-black/50">
            Active: {windowTitle}
          </div>
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


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

export type AnchorMenuProps = {
  anchors: Anchor[];
};

type Anchor = { icon?: React.ReactNode; id: string; label: string };

const AnchorMenu: React.FC<AnchorMenuProps> = ({ anchors }) => {
  const [activeId, setActiveId] = useState<null | string>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const elements = anchors
      .map(a => document.getElementById(a.id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [anchors]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label="On-page navigation"
      className="fixed top-6 left-6 z-20 flex flex-col items-center rounded-md border border-white/10 bg-slate-800/10 shadow-sm backdrop-blur-md transition-colors hover:bg-slate-800/60">
      <button
        aria-controls="anchor-menu"
        aria-expanded={isExpanded}
        aria-label="Toggle anchor menu"
        className="flex w-full justify-center bg-transparent p-2 text-white/50 hover:text-white sm:hidden"
        onClick={() => setIsExpanded(prev => !prev)}>
        <MdMenu size={32} />
      </button>
      <ul
        className={`flex flex-col overflow-hidden transition-all sm:max-h-96 sm:max-w-48 ${isExpanded ? "max-h-96 max-w-48" : "max-h-0 max-w-0"}`}>
        {anchors.map(a => {
          const active = activeId === a.id;
          return (
            <li key={a.id}>
              <Link
                aria-current={active ? "true" : undefined}
                className={`group flex items-center gap-3 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white ${
                  active ? "bg-white/10 text-white" : "text-white/80"
                }`}
                href={`#${a.id}`}
                onClick={e => handleAnchorClick(e, a.id)}>
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-white/50 transition group-hover:bg-white ${
                    active ? "bg-blue-400" : "bg-white/30"
                  }`}
                />
                {a.icon}
                <span>{a.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AnchorMenu;

import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

export interface AnchorMenuProps {
  anchors: Anchor[];
}

interface Anchor {
  id: string;
  label: string;
}

export default function AnchorMenu({ anchors }: AnchorMenuProps) {
  const [activeId, setActiveId] = useState<null | string>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const elements = anchors
      .map(anchor => document.getElementById(anchor.id))
      .filter((element): element is HTMLElement => !!element);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        let visible: IntersectionObserverEntry | undefined;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (
            !visible ||
            entry.intersectionRatio > visible.intersectionRatio
          ) {
            visible = entry;
          }
        }

        if (!visible) {
          return;
        }

        if (visible.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [anchors]);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setIsExpanded(false);
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
        onClick={() => {
          setIsExpanded(prev => !prev);
        }}>
        <MdMenu size={32} />
      </button>
      <ul
        className={`flex flex-col overflow-hidden transition-all sm:max-h-96 sm:max-w-48 ${
          isExpanded ? "max-h-96 max-w-48" : "max-h-0 max-w-0"
        }`}
        id="anchor-menu">
        {anchors.map(anchor => {
          const active = activeId === anchor.id;
          return (
            <li key={anchor.id}>
              <a
                aria-current={active ? "true" : undefined}
                className={`group flex items-center gap-3 px-3 py-2 text-sm transition hover:bg-white/10 hover:text-white ${
                  active ? "bg-white/10 text-white" : "text-white/80"
                }`}
                href={`#${anchor.id}`}
                onClick={event => {
                  handleAnchorClick(event, anchor.id);
                }}>
                <span
                  className={`h-1.5 w-1.5 rounded-full transition group-hover:bg-white ${
                    active ? "bg-blue-400" : "bg-white/30"
                  }`}
                />
                <span>{anchor.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

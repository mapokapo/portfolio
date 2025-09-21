import { useSpring, animated } from "@react-spring/web";
import { useState, useRef, PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren & {
  summary: React.ReactNode;
};

const AnimatedDetails: React.FC<Props> = ({ children, summary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0 });

  useEffect(() => {
    if (!isDetailsOpen || !expandRef.current) return;

    const el = expandRef.current;
    const measure = () => {
      const h = el.getBoundingClientRect().height;
      setBounds(prev => (prev.height !== h ? { height: h } : prev));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isDetailsOpen, children]);

  const expandStyles = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? bounds.height : 0 },
    immediate: !bounds.height,
    config: { tension: 280, friction: 26, duration: 300 },
    onRest: () => {
      if (!isOpen) setIsDetailsOpen(false);
    },
  });

  const handleToggle = () => {
    if (!isOpen) {
      setIsDetailsOpen(true);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <details
      open={isDetailsOpen}
      // Prevent native toggle behavior; we fully control it
      onToggle={e => e.preventDefault()}>
      <summary
        className="mb-16 cursor-pointer select-none list-none"
        onClick={e => {
          e.preventDefault();
          handleToggle();
        }}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-expanded={isOpen}>
        {summary}
      </summary>
      <animated.div
        style={expandStyles}
        className="overflow-hidden">
        <div ref={expandRef}>{children}</div>
      </animated.div>
    </details>
  );
};

export default AnimatedDetails;

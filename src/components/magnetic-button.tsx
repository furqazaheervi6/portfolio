"use client";

import { useRef, type ReactNode, useCallback } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  const Tag = href ? "a" : "button";
  const extraProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      <Tag {...extraProps}>{children}</Tag>
    </div>
  );
}


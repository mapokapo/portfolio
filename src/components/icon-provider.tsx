"use client";

import { useMemo } from "react";
import { IconContext } from "react-icons";

type IconProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export default function IconProvider({ children }: IconProviderProps) {
  const value = useMemo(() => ({ attr: { "aria-hidden": true } }), []);

  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

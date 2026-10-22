import React, { ReactNode } from "react";

export default function MemberPortalLayout({ children }: { children: ReactNode }) {
  return <div className="portal-root">{children}</div>;
}

import type { Role } from "@/lib/types";
import { isAdminRole, isLeaderRole } from "@/lib/auth";

export function getMainNavigation(role: Role) {
  const items = [
    { href: "/home", label: "Home" },
    { href: "/levels", label: "Levels" },
    { href: "/groups", label: "Groups" },
    { href: "/community", label: "Community" },
    { href: "/profile", label: "Profile" }
  ];

  if (isLeaderRole(role)) {
    items.push({ href: "/leader", label: "Leader" });
  }

  if (isAdminRole(role)) {
    items.push({ href: "/admin", label: "Admin" });
  }

  return items;
}

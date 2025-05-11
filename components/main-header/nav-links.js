"use client";
import Link from "next/link";
import classes from "./nav-links.module.css";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, className }) {
  const path = usePathname();
  const isActive = path === href || path.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`${isActive ? classes.active : ""} ${className || ""}`.trim()}
    >
      {children}
    </Link>
  );
}

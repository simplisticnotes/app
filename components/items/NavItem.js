import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavItem({ children, href, Icon, button, onClick }) {
  const router = useRouter();
  const activeLink = router.pathname === href;
  const className = [
    "bg-white flex w-full gap-3 items-center mb-6 py-2 px-3 text-center shadow-md hover:border-b-8 border-b-primary",
    activeLink ? "border-b-8" : null,
  ].join(" ");

  return button ? (
    <button className={className} onClick={onClick}>
      <Icon className="w-5" />
      <span>{children}</span>
    </button>
  ) : (
    <Link className={className} href={href}>
      <Icon className="w-5" />
      <span>{children}</span>
    </Link>
  );
}

export default NavItem;

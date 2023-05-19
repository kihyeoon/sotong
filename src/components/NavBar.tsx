"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  HomeFillIcon,
  SearchIcon,
  SearchFillIcon,
  NewIcon,
  NewFillIcon,
} from "@/components/ui/icons";
import ColorButton from "@/components/ui/ColorButton";

const menu = [
  { href: "/", Icon: <HomeIcon />, FillIcon: <HomeFillIcon /> },
  { href: "/search", Icon: <SearchIcon />, FillIcon: <SearchFillIcon /> },
  { href: "/new", Icon: <NewIcon />, FillIcon: <NewFillIcon /> },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between p-4 sticky top-0 bg-white">
      <Link href="/">
        <h1 className="text-3xl font-bold">Sotong</h1>
      </Link>
      <nav>
        <ul className="flex space-x-4 text-xl items-center">
          {menu.map(({ href, Icon, FillIcon }) => (
            <li key={href}>
              <Link href={href}>{pathname === href ? FillIcon : Icon}</Link>
            </li>
          ))}
          <li>
            <Link href="/signIn">
              <ColorButton text="Sign In" onClick={() => {}} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

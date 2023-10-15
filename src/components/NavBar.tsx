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
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "@/components/Avatar";

const menu = [
  { href: "/", Icon: <HomeIcon />, FillIcon: <HomeFillIcon /> },
  { href: "/search", Icon: <SearchIcon />, FillIcon: <SearchFillIcon /> },
  { href: "/new", Icon: <NewIcon />, FillIcon: <NewFillIcon /> },
];

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 bg-white z-20">
      <div className="flex items-center justify-between p-4  max-w-screen-lg mx-auto">
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
            {user && (
              <li>
                <Link href={`/user/${user.username}`}>
                  <Avatar image={user.image} size="small" />
                </Link>
              </li>
            )}
            <li>
              {session ? (
                <ColorButton text="Sign out" onClick={() => signOut()} />
              ) : (
                <ColorButton text="Sign in" onClick={() => signIn()} />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

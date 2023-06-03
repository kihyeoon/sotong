import NavBar from "@/components/NavBar";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import { ReactNode } from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Sotong",
  description: "즐겁게 소통하는 공간",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
        <AuthContext>
          <NavBar />
          <main className="grow p-4">{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}

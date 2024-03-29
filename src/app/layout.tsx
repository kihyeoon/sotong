import NavBar from "@/components/NavBar";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import { ReactNode } from "react";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sotong",
    template: "Sotong | %s",
  },
  description: "Sotong Photo Gallery",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="flex flex-col min-h-screen bg-neutral-50 overflow-auto">
        <AuthContext>
          <NavBar />
          <main className="w-full flex justify-center max-w-screen-lg mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}

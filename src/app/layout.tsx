import NavBar from "@/components/NavBar";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Sotong",
  description: "즐겁게 소통하는 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
        <NavBar />
        <main className="grow p-4">{children}</main>
      </body>
    </html>
  );
}

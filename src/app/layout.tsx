import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZ FIZZ — Motion Experience",
  description: "Engineered to move."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

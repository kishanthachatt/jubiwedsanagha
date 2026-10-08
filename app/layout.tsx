import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_Malayalam, Outfit } from "next/font/google";
import { getSiteUrl } from "@/lib/invitation-config";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const malayalam = Noto_Serif_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Jubin & Anagha",
    template: "%s",
  },
  description: "Wedding invitation for Jubin and Anagha.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${malayalam.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory font-sans text-espresso">{children}</body>
    </html>
  );
}

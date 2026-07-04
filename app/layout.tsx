import type { Metadata } from "next";
import { Nunito_Sans, Patrick_Hand, Quicksand, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import AudioPlayer from "./components/AudioPlayer";

const quicksand = Quicksand({
  weight: "400",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seed Project",
  description: "every seeds becomes a forest",

  icons:{
    icon: "/icon-png.png",
    apple: "/apple-touch-icon.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={quicksand.className}>
        {children}
        <AudioPlayer defaultMuted={false} />
        <BottomNav />
      </body>
    </html>
  );
}

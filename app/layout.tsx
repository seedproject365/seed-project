import type { Metadata, Viewport } from "next";
import {
  Quicksand,
  Noto_Sans_SC,
} from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import AudioPlayer from "./components/AudioPlayer";
import { ProfileProvider } from "./context/ProfileContext";
import ProfileGate from "./profile/ProfileGate";

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
  icons: {
    icon: "/icon-png.png",
    apple: "/apple-touch-icon.PNG",
  },
};

// 手机禁止缩放
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="h-full antialiased">
      <body className={`${quicksand.className} ${notoSansSC.className}`}>
        <ProfileProvider>
          <ProfileGate>{children}</ProfileGate>
          <AudioPlayer defaultMuted={false} />
          <BottomNav />
        </ProfileProvider>
      </body>
    </html>
  );
}
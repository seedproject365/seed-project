import { Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen bg-transparent flex items-center justify-center pb-24">
        <div className="text-center">
          <Image
            src="/seed homepage.png"
            alt="Seed Project Logo"
            width={400}
            height={400}
            className="mx-auto mb-6"
          />
          <Link href="/plant">
            <button
              className="rounded-full bg-[#5C4033] px-6 py-3 text-base text-white shadow-lg hover:scale-105 transition"
            >
              🌱 Plant your seed now 🌱
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
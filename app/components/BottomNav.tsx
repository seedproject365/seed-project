"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Leaf, Sprout, User } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function BottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: <Home size={22} /> },
    { label: "Today's Seed", href: "/plant", icon: <Sprout size={22} /> },
    { label: "Garden", href: "/garden", icon: <Leaf size={22} /> },
    { label: "Profile", href: "/profile", icon: <User size={22} /> },
  ];

  return (
    <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className="
          w-full
          max-w-md
          rounded-full
          bg-[#5C4033]/90
          backdrop-blur-xl
          shadow-2xl
          border
          border-white/10
          px-2
          py-2
        "
      >
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`
                      flex flex-col items-center
                      justify-center
                      gap-1
                      rounded-full
                      px-4
                      py-2
                      transition-all
                      duration-300
                      cursor-pointer
                      ${
                        isActive
                          ? "bg-[#8FAE8B] text-[#3E3028] shadow-md scale-105"
                          : "text-white hover:bg-white/10 hover:scale-105"
                      }
                    `}
                  >
                    {item.icon}

                    <span className="text-[11px] font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
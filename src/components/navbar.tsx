"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const nav = [
    { href: "/", label: "Início" },
    { href: "/membros", label: "Membros" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-neutral-200">
          The Kingdom
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-neutral-400 hover:text-neutral-200 transition-colors",
                  pathname === item.href && "text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
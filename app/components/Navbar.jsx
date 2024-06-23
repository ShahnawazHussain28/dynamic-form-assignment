"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex fixed top-0 left-0 gap-10 justify-center py-5 w-full text-xl bg-gray-200 dark:bg-gray-800">
      <Link
        href={"/basic"}
        className={`${pathname === "/basic" ? "text-blue-500 font-bold" : ""}`}
      >
        Basic
      </Link>
      <Link
        href={"/intermediate"}
        className={`${pathname === "/intermediate" ? "text-blue-500 font-bold" : ""}`}
      >
        Intermediate
      </Link>
      <Link
        href={"/advanced"}
        className={`${pathname === "/advanced" ? "text-blue-500 font-bold" : ""}`}
      >
        Advanced
      </Link>
    </div>
  );
}

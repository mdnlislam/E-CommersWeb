"use client";

import Link from "next/link";
import { navLinks } from "@/data/navLinks";
import { Heart, ShoppingCart, User } from "lucide-react";
// import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // const [active, setActive] = useState(false);
  const user = null; // পরে JWT/Auth Context থেকে আসবে
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Shop
          </Link>

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button className="cursor-pointer">
              <Heart size={22} />
            </button>

            {/* Cart */}
            <button className="relative cursor-pointer">
              <ShoppingCart size={22} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* Auth */}
            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <User size={18} />
                Profile
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={`border text-black border-gray-300 px-4 py-2 rounded-lg  ${pathname === "/login" ? "bg-blue-700 text-white" : ""}`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className={` border border-gray-300 text-black  px-4 py-2 rounded-lg ${pathname === "/register" ? "bg-blue-700 text-white" : ""}`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

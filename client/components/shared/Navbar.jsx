"use client";

import Link from "next/link";
import { navLinks } from "@/data/navLinks";
import { Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
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
          <div className="flex items-center gap-5">
            <button>
              <Heart size={22} />
            </button>

            <button className="relative">
              <ShoppingCart size={22} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

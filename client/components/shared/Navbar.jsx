"use client";

import Link from "next/link";
import { navLinks } from "@/data/navLinks";
import { Heart, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setToken(storedToken);

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserImage(parsedUser.image);
    } else {
      setUserImage(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUserImage(null);

    router.push("/login");
  };

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

            {token ? (
              <>
                {/* Profile */}
                <Link href="/profile">
                  <div className="w-10 h-10 rounded-full border bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center overflow-hidden">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={22} className="text-gray-500" />
                    )}
                  </div>
                </Link>
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-red-400 hover:bg-red-300 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/login"
                  className={`border border-blue-500 px-4 py-2 rounded-lg transition ${
                    pathname === "/login"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  href="/register"
                  className={`border border-gray-300 px-4 py-2 rounded-lg transition ${
                    pathname === "/register"
                      ? "bg-blue-600 text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

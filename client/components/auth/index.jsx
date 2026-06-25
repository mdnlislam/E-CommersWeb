"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Auth({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = ["/login", "/register"];
  const privatePaths = ["/products", "/categories", "/cart", "/wishlist"];

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (publicPaths.includes(pathname) && token) {
        router.push("/products");
      }
      if (privatePaths.includes(pathname) && !token) {
        router.push("/login");
      }
      setLoading(false);
    };
    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-xl">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>

          <p className="text-sm text-gray-500">
            Please wait while we verify your account
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

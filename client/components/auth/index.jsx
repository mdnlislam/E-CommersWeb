"use client";

import axios from "axios";
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

      // token checking logic
      if (!token) {
        if (privatePaths.includes(pathname)) {
          router.push("/login");
          return;
        }
        setLoading(false);
        return;
      }

      // backend verification logic

      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.data.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (publicPaths.includes(pathname)) {
          router.push("/products");
          return;
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        router.push("/login");
      }
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

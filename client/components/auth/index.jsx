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
      // ১. যদি ইমেইল ভেরিফিকেশন পেজ হয়, তবে কোনো চেক ছাড়াই সরাসরি ঢুকতে দিন
      if (pathname.startsWith("/verify-email")) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      // ২. প্রাইভেট পেজে টোকেন না থাকলে লগইনে পাঠান
      if (privatePaths.includes(pathname) && !token) {
        router.push("/login");
        setLoading(false);
        return;
      }

      // ৩. টোকেন থাকলে সার্ভার থেকে ভ্যালিডেশন চেক করুন
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // লগইন করা থাকলে লগইন/রেজিস্ট্রেশন পেজে ঢুকতে না দিয়ে ড্যাশবোর্ডে পাঠান
          if (response.data.success && publicPaths.includes(pathname)) {
            router.push("/products");
            return; // রাউটিং হচ্ছে, তাই loading false করার দরকার নেই
          }
        } catch (err) {
          console.log(
            "Auth validation failed",
            err.response?.data?.message || err.message,
          );
          localStorage.removeItem("token");
          if (privatePaths.includes(pathname)) {
            router.push("/login");
            return;
          }
        }
      }

      // ৪. সব চেক শেষ হলে লোডিং বন্ধ করুন
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // যখন লোডিং ট্রু থাকবে এবং ইউজার ইমেইল ভেরিফাই পেজে থাকবে না, তখন স্পিনার দেখাবে
  if (loading && !pathname.startsWith("/verify-email")) {
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

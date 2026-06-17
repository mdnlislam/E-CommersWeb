"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import API from "../../services/axiosInstance"; // আপনার তৈরি করা এক্সিওস ইনস্ট্যান্স

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 👈 ইউআরএল থেকে টোকেনটা রিড করা হচ্ছে
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const triggerVerification = async () => {
      if (!token) {
        setStatus("error");
        setMessage("ভেরিফিকেশন টোকেনটি পাওয়া যায়নি!");
        return;
      }

      try {
        // 👈 ফ্রন্টএন্ড ব্যাকগ্রাউন্ড থেকে আপনার ব্যাকএন্ড এপিআই-তে হিট করছে
        const response = await API.get(`/auth/verify-email?token=${token}`);

        setStatus("success");
        setMessage(response.data.message);
      } catch (error) {
        setStatus("error");
        // আপনার স্ক্রিনশটের "Invalid verification token" মেসেজটি এখানে সুন্দর করে দেখাবে
        setMessage(
          error.response
            ? error.response.data.message
            : "ভেরিফিকেশন ব্যর্থ হয়েছে!",
        );
      }
    };

    triggerVerification();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
        {/* ১. ভেরিফিকেশন যখন প্রসেসিং এ থাকবে */}
        {status === "verifying" && (
          <div>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-blue-600">
              Account Verifying...
            </h1>
            <p className="text-gray-500 mt-2">
              অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।
            </p>
          </div>
        )}

        {/* ২. ডাটাবেজে successfully 'isVerified: true' হয়ে গেলে */}
        {status === "success" && (
          <div>
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-green-600">
              Verification Successful!
            </h1>
            <p className="text-gray-600 mt-2 font-medium">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md shadow-blue-100"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* ৩. টোকেন ইনভ্যালিড বা এক্সপায়ারড হলে (আপনার স্ক্রিনশটের এররটি এখানে হ্যান্ডেল হবে) */}
        {status === "error" && (
          <div>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h1>
            <p className="text-gray-600 mt-2 font-medium">{message}</p>
            <button
              onClick={() => router.push("/register")}
              className="mt-6 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Back to Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="text-black text-center mt-20">Loading Page...</div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

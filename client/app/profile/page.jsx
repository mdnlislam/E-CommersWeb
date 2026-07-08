"use client";

import { useEffect, useState } from "react";
import API from "@/services/axiosInstance";
import { Camera, Loader2 } from "lucide-react"; // Loader2 আইকন যোগ করা হয়েছে

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // নতুন ছবি প্রিভিউ এর জন্য
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) setUser(userData);
    } catch (error) {
      console.error("Error loading local storage:", error);
    }
  };

  // ছবি সিলেক্ট করলে প্রিভিউ দেখানোর ফাংশন
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file)); // ব্লব ইউআরএল তৈরি
    }
  };

  const handleUpload = async () => {
    if (!profilePic) return;

    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await API.put("/auth/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = res.data.user;

      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile picture updated successfully.");
        setProfilePic(null);
        setPreviewUrl(null); // সাকসেস হলে প্রিভিউ ক্লিন করা
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // প্রোডাকশন লেভেল স্কেলিটন লোডার (Loading... লেখার চেয়ে অনেক সুন্দর)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md animate-pulse flex flex-col items-center">
          <div className="w-36 h-36 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 w-1/2 rounded mt-5"></div>
          <div className="h-4 bg-gray-200 w-1/3 rounded mt-2"></div>
        </div>
      </div>
    );
  }

  // ডিফল্ট পিকচার হিসেবে নামের প্রথম অক্ষর দিয়ে ডাইনামিক ইমেজ জেনারেট করা
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.username,
  )}&background=2563eb&color=fff&size=150`;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center text-slate-800 p-5">
      <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8 w-full max-w-md transition-all">
        <div className="flex flex-col items-center">
          {/* প্রোফাইল ইমেজ সেকশন */}
          <div className="relative group">
            <img
              src={previewUrl || user.image || defaultAvatar}
              alt={user.username}
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-blue-500/20"
            />

            <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-blue-700 shadow-md transition-transform active:scale-95">
              <Camera size={18} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
          </div>

          {/* ইউজার ইনফো */}
          <h2 className="text-2xl font-bold mt-5 tracking-tight">
            {user.username}
          </h2>
          <p className="text-slate-500 text-sm mt-1">{user.email}</p>

          {/* অ্যাকশন বাটন */}
          {profilePic && (
            <div className="flex gap-2 mt-6 w-full">
              <button
                onClick={() => {
                  setProfilePic(null);
                  setPreviewUrl(null);
                }}
                disabled={loading}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

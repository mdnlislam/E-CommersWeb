"use client";

import { useEffect, useState } from "react";
import API from "@/services/axiosInstance";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) setUser(userData);
    } catch (error) {
      console.log("Error loading local storage:", error);
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
      }
    } catch (err) {
      console.log("Upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center text-black p-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.image || "/default-avatar.png"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
            />

            <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={18} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </label>
          </div>

          <h2 className="text-2xl font-bold mt-5">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>

          {profilePic && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Uploading..." : "Update Picture"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

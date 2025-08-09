import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { variables } from "../utils/constants";

const Profile = () => {
  const {getProfile,updateProfile} = useAuthStore();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile()
      setForm({name:result.user.name,email:result.user.email,number:result.user.number})
    };

    fetchProfile();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form) 
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("❌ Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading profile...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-red-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-900 p-8 rounded-2xl w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 mb-4 rounded bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          disabled
          className="p-3 mb-4 rounded bg-zinc-800 text-gray-400 placeholder-gray-400 outline-none cursor-not-allowed"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="p-3 mb-6 rounded bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 p-3 rounded text-lg font-medium transition"
        >
          Update Profile
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;

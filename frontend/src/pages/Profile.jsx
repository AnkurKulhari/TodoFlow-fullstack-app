import { useEffect, useState } from "react";
import { User, Mail, Calendar, Lock } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import api from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-100 flex justify-center items-center">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      </>
    );
  }

  const initials = user.full_name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-12 px-4">

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36"></div>

          {/* Avatar */}

          <div className="-mt-14 flex justify-center">

            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white">
              {initials}
            </div>

          </div>

          <div className="text-center mt-5">

            <h1 className="text-3xl font-bold text-slate-800">
              {user.full_name}
            </h1>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

          </div>

          <div className="mt-10 px-8 pb-10 space-y-6">

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <User className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-semibold">{user.full_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <Calendar className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="font-semibold">
                  {new Date(user.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <button
              disabled
              className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-200 text-slate-500 py-3 rounded-xl cursor-not-allowed"
            >
              <Lock size={18} />
              Change Password (Coming Soon)
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;
import { useEffect, useRef, useState } from "react";
import {
  CheckSquare,
  ChevronDown,
  LogOut,
  Trash2,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DeleteAccountModal from "../Profile/DeleteAccountModal";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.full_name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <CheckSquare size={22} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              TodoFlow
            </h1>
          </div>

          {/* Profile */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {initials || "?"}
              </div>

              <span className="hidden sm:block font-semibold text-slate-800">
                {user?.full_name || "Loading..."}
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                <div className="px-5 py-4 bg-slate-50 border-b">
                  <p className="font-semibold text-slate-800">
                    {user?.full_name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
                >
                  <UserCircle
                    size={18}
                    className="text-blue-600"
                  />

                  <span className="text-slate-700">
                    My Profile
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
                >
                  <LogOut
                    size={18}
                    className="text-red-600"
                  />

                  <span className="text-slate-700">
                    Logout
                  </span>
                </button>

                <div className="border-t"></div>

                <button
                  onClick={() => {
                    setOpen(false);
                    setDeleteOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition"
                >
                  <Trash2
                    size={18}
                    className="text-red-600"
                  />

                  <span className="text-red-600">
                    Delete Account
                  </span>
                </button>

              </div>
            )}
          </div>

        </div>
      </nav>

      <DeleteAccountModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await api.delete("/auth/me");

            logout();
            navigate("/login");
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </>
  );
}

export default Navbar;
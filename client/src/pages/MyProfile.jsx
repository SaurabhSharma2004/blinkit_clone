import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateUserDetails, uploadAvatar } from "../services/operations/profileApi";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const {accessToken} = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
        toast.error("Please select a file");
        return;
    };
    setAvatarFile(file);
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(uploadAvatar(accessToken,formData));
  };
  const handlePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      passwords.newPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }
    const payload = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      ...(passwords.newPassword && { password: passwords.newPassword }),
    };

    dispatch(updateUserDetails(accessToken, payload));
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <section className="h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <header className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-600 mt-1">
            Role: <span className="font-medium capitalize">{user.role}</span> |
            Last login:{" "}
            {user.last_login_date ? formatDate(user.last_login_date) : "–"}
          </p>
        </header>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-2 border-green-500"
            />
            <label className="mt-4 cursor-pointer text-blue-600 hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatar}
              />
            </label>
          </div>
          {/* Details Form */}
          <form
            className="lg:col-span-2 flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                  placeholder="John Doe"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email Address</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-gray-700">Mobile Number</span>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                  placeholder="+1 234 567 890"
                />
              </label>
            </div>

            {/* Change Password */}
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Change Password
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handlePassword}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                  placeholder="New Password"
                />
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handlePassword}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="self-start px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Save Changes
            </button>

            {/* Quick Links */}
            <div className="pt-4 border-t flex flex-wrap gap-4">
              <Link
                to="/dashboard/orders"
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
              >
                View My Orders
              </Link>
              <Link
                to="/dashboard/addresses"
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
              >
                Manage Addresses
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

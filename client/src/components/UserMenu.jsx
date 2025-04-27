import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaThList,
  FaLayerGroup,
  FaPlusSquare,
  FaBoxes,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { setAccessToken, setRefreshToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";

const UserMenu = ({close}) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-1 min-w-[240px] max-h-[75vh] overflow-y-auto">
      <div className="flex items-center gap-3 border-b pb-2 mb-2">
        <img
          src={user?.avatar}
          alt="profile pic"
          className="w-9 h-9 rounded-full object-cover border-2 border-green-500"
        />
        <div>
          <div className="font-semibold text-gray-800 text-base truncate">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 truncate">{user.email}</div>
          <div className="text-xs text-green-600 font-medium capitalize">
            {user.role}
          </div>
        </div>
      </div>

      <Link
        to="/dashboard/profile"
        onClick={(prev) => close(!prev)}
        className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 text-sm"
      >
        <FaUser /> My Profile
      </Link>

      {user.role === "admin" && (
        <div className="flex flex-col gap-1">
          <Link
            to="/dashboard/category"
            onClick={(prev) => close(!prev)}
            className="flex-1 min-w-[48%] flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-100 transition-colors text-gray-700 text-sm"
          >
            <FaThList /> Category
          </Link>
          <Link
            to="/dashboard/subcategory"
            onClick={(prev) => close(!prev)}
            className="flex-1 min-w-[48%] flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-100 transition-colors text-gray-700 text-sm"
          >
            <FaLayerGroup /> Subcategory
          </Link>
          <Link
            to="/dashboard/upload-product"
            onClick={(prev) => close(!prev)}
            className="flex-1 min-w-[48%] flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-100 transition-colors text-gray-700 text-sm"
          >
            <FaPlusSquare /> Upload
          </Link>
          <Link
            to="/dashboard/products"
            onClick={(prev) => close(!prev)}
            className="flex-1 min-w-[48%] flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-100 transition-colors text-gray-700 text-sm"
          >
            <FaBoxes /> Products
          </Link>
        </div>
      )}

      <div className="mt-2 mb-1 text-xs text-gray-400 px-2">Account</div>
      <Link
        to="/dashboard/orders"
        onClick={(prev) => close(!prev)}
        className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 text-sm"
      >
        <FaBoxOpen /> My Orders
      </Link>
      <Link
        to="/dashboard/addresses"
        onClick={(prev) => close(!prev)}
        className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 text-sm"
      >
        <FaMapMarkerAlt /> Saved Addresses
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-2 text-sm"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default UserMenu;

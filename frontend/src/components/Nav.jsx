import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HiOutlineShoppingCart,
  HiOutlineBellAlert,
  HiOutlineUserCircle,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

const Nav = ({ menuItems, Logo, items }) => {
  const { checkTokenValidity, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("loginToken");
    checkTokenValidity();
    navigate("/");
  }

  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <Link to="/">
        <img src={Logo} alt="logo" className="h-12 w-auto" />
      </Link>
      <ul className="flex gap-7">
        <li>
          <Link to="/search" className="font-medium capitalize text-secondary">
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/minimart" className="font-medium capitalize text-secondary">
            Minimart
          </Link>
        </li>
        <li>
          <Link to="/about" className="font-medium capitalize text-secondary">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="font-medium capitalize text-secondary">
            Contact
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-4 font-medium">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/minimart/cart" className="hover:text-fuchsia-600">
                <HiOutlineBellAlert size={28} />
              </Link>
            </li>
            <li>
              <Link to="/minimart/cart" className="relative hover:text-fuchsia-600">
                <HiOutlineShoppingCart size={28} />
                {items > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-700 rounded-full">
                    {items}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/userprofile" className="hover:text-fuchsia-600">
                <HiOutlineUserCircle size={30} />
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="pt-1 hover:text-fuchsia-600"
              >
                <HiArrowRightOnRectangle size={28} />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="text-secondary px-4 py-4 rounded">
                  Log In
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="text-secondary px-4 py-4 rounded">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;

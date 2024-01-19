import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userAuthSlice";
import userImage from "../assets/user.png";
import logo from "../assets/logo.svg";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-12" alt="Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <span>Hello, {user?.fullName}</span>
              <button
                type="button"
                className="flex text-sm  rounded-full md:me-0 focus:ring-4  dark:focus:ring-gray-600"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user?.image || userImage}
                  alt={
                    user
                      ? `${user?.username} profile picture`
                      : "profile picture"
                  }
                />
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

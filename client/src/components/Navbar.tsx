import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userAuthSlice";
import logo from "../assets/tasks.png";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <nav className="bg-white px-4 border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-12" alt="Logo" />
          <p className="font-semibold text-xl">Task Manager</p>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <span className="hidden lg:block mr-4 font-medium">
                Hello, {user.fullName}
              </span>
              <img
                className="w-12 h-12 rounded-full"
                src={user.image}
                alt={`${user.username} profile picture`}
              />
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

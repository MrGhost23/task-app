import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, selectUser } from "@/store/slices/userAuthSlice";
import logo from "../assets/tasks.png";
import { Button } from "./ui/button";
import { Menu } from "@headlessui/react";
import { useAppDispatch } from "@/utils/hooks";
import userImage from "@/assets/user.png";

const Navbar: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = userImage;
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white px-4 border-gray-200 dark:bg-gray-900">
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
            <div className="flex items-center">
              <span className="hidden lg:block mr-4 font-medium">
                Hello, {user.fullName}
              </span>
              <Menu>
                <Menu.Button>
                  <img
                    className="w-12 h-12 rounded-full cursor-pointer"
                    src={user.image}
                    alt={user.fullName}
                    onError={handleImageError}
                  />
                </Menu.Button>
                <Menu.Items className="absolute top-14 right-8 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? "bg-sky-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => dispatch(logout())}
                        className={`${
                          active ? "bg-sky-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          ) : (
            <div className="space-x-2 flex">
              <Link to="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-sky-500">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  HomeActive,
  Watch,
  Friends,
  Gaming,
  Market,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
} from "../../svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import SearchMenu from "./searchmenu";
import AllMenu from "./allmenu";
import useClickOutSide from "../../hooks/useclickoutside";
import UserMenu from "./usermenu";

const Header = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const user = useSelector((state) => state.user);

  const [showAllMenu, setShowAllMenu] = useState(false);
  const AllMenuRef = useRef(null);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();

  useClickOutSide(AllMenuRef, () => {
    setShowAllMenu(false);
  });
  useClickOutSide(userMenuRef, () => {
    setShowUserMenu(false);
  });

  return (
    <div className="bg-white shadow-md z-50 fixed top-0 left-0 w-full h-14">
      <div className="h-full relative flex items-center justify-between">
        {/* Left header */}
        <div className="flex items-center h-full space-x-3 px-3">
          <Link to="/">
            <Logo />
          </Link>
          <div
            onClick={() => {
              setShowSearchMenu(true);
            }}
            className="relative flex items-center"
          >
            <span
              className="absolute bg-gray-200 hover:bg-gray-300 xl:hover:bg-transparent transition-colors
            cursor-pointer p-3 xl:p-0 xl-bg-transparent rounded-full ml-3 text-gray-600"
            >
              <MagnifyingGlassIcon className="w-5" />
            </span>
            <input
              type="text"
              placeholder="Search Facebook"
              className="w-full hidden xl:block border-none rounded-full text-gray-600 text-md bg-gray-200 pl-9"
            />
          </div>
        </div>
        {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}

        {/* Header Middle */}
        <div className="flex items-center space-x-1  lg:space-x-8 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 hidden sm:block transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <HomeActive />
          </NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Friends />
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 transition-colors hidden sm:block relative " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Watch />
            <span className="absolute top-1 left-4 p-2 w-5 h-5 text-sm rounded-full flex items-center justify-center text-gray-200 font-bold bg-red-600">
              19
            </span>
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 px-6 hidden sm:block transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Market />
          </NavLink>
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              "hover:bg-gray-200 rounded-lg py-3 hidden md:block  px-6 transition-colors " +
              (isActive
                ? "border-b-4 border-b-blue-500 rounded-none hover:bg-transparent"
                : "")
            }
          >
            <Gaming />
          </NavLink>
        </div>
        {/* Header Right */}
        <div className="flex items-center justify-end pr-3 space-x-1 lg:space-x-3">
          <NavLink
            to={`/profile/${user?.userInfo?.userName}`}
            className="flex items-center justify-center space-x-1 rounded-full transition-colors
          hover:bg-gray-200 p-1"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden hidden sm:flex border-[1px] border-gray-100">
              <img
                src={user?.userInfo?.picture}
                alt="profilePic"
                className="object-cover"
              />
            </div>
            <span className="text-md font-semibold hidden lg:block text-gray-700 pr-2">
              {user?.userInfo?.userName}
            </span>
          </NavLink>
          <div ref={AllMenuRef}>
            <div
              onClick={() => setShowAllMenu((prev) => !prev)}
              className={`flex items-center justify-center p-1 bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full
            transition-colors cursor-pointer ${showAllMenu && "bg-blue-100"}`}
            >
              <Menu color={showAllMenu && "#1b74e4"} />
            </div>
            {showAllMenu && <AllMenu />}
          </div>
          <div>
            <div
              className="flex items-center justify-center p-1 bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full
            transition-colors cursor-pointer"
            >
              <Messenger />
            </div>
          </div>
          <div className="relative">
            <div
              className="flex items-center justify-center p-1 bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full
            transition-colors cursor-pointer"
            >
              <Notifications />
              <span
                className="flex items-center justify-center bg-red-600 text-gray-200 rounded-full
              w-5 h-5 absolute -top-1 -right-2 text-sm"
              >
                8
              </span>
            </div>
          </div>
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setShowUserMenu((prev) => !prev)}
              className={`flex items-center justify-center p-1 bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full
            transition-colors cursor-pointer ${showUserMenu && "bg-blue-100"}`}
            >
              <ArrowDown color={showUserMenu && "#1b74e4"} />
            </div>
            {showUserMenu && <UserMenu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

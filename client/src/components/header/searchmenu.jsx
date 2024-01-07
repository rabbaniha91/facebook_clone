import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useRef } from "react";
import useClickOutSide from '../../hooks/useclickoutside';


const SearchMenu = ({ setShowSearchMenu }) => {
  const user = useSelector((state) => state.user);

  const searchIcon = useRef(null);
  const searchBox = useRef(null)
  useClickOutSide(searchBox, ()=> {
    setShowSearchMenu(false)
  })


  return (
    <div ref={searchBox} className="w-80 fixed top-0 left-0 z-50 bg-white shadow-lg p-3 h-96 rounde-tr-lg rounded-br-lg">
      <div className="w-full flex items-center justify-between">
        <div className="text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer p-2">
          <span
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <ArrowLeftIcon className="w-5" />
          </span>
        </div>
        <div className="relative flex items-center">
          <span ref={searchIcon} className="text=gray-600 absolute ml-3">
            <MagnifyingGlassIcon className="w-5 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer" />
          </span>
          <input
            type="text"
            onFocus={() => {
              searchIcon.current.style.display = "none";
            }}
            onBlur={() => {
              searchIcon.current.style.display = "block";
            }}
            autoFocus={true}
            placeholder="Search Facebook"
            className="w-full rounded-full border-none text-gray-600
        text-md bg-gray-200 pl-9"
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-lg mt-3">
        <span className="text-gray-600 font-semibold">Recent Searches</span>
        <span className="text-blue-500">Edit</span>
      </div>
      <div className="text-lg text-gray-700 flex justify-between items-center hover:bg-gray-200 rounded-lg transition-colors p-2">
        <span className="flex items-center justify-between">
          <img
            src={user?.userInfo?.picture}
            alt="profile picture"
            className="w-8 h-8 rounded-full mr-2 bg-gray-300 object-cover"
          />
          <span>Heyadr</span>
        </span>
          <XMarkIcon className="w-5 text-red-400 hover:text-red-600 transition-colors cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchMenu;

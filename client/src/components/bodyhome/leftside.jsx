import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import LeftSideLinks from "./leftsidelinks";
import { left } from "../../data/home";
const LeftSideBodyHome = () => {
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  return (
    <div className="fixed top-0 left-0 pt-16  pb-4 hidden sm:block h-full">
      <div className="flex flex-col items-center space-y-2 xl:space-y-0 xl:items-stretch px-3 h-full 
      sm:overflow-y-scroll xl:w-56 sm:scrollbar-thin sm:scrollbar-thumb-blue-400 sm:scrollbar-thumb-rounded-2xl
      sm:scrollbar-track-gray-300 sm:scrollbar-track-rounded-2xl scrollbar-none">
        <Link
          to="/"
          className="flex items-center space-x-2 p-2 xl:mr-3 xl:w-auto xl:h-auto bg-gray-300
                rounded-full hover:bg-gray-400 xl:bg-transparent xl:hover:bg-gray-300 transition-colors
                xl:rounded-lg"
        >
          <img
            className="w-9 h-9 rounded-full shrink-0 object-cover"
            src={user?.userInfo?.picture}
            alt="ProfilePicture"
          />
          <span className="hidden xl:block text-md font-semibold">
            {user?.userInfo?.userName}
          </span>
        </Link>
        {left.slice(0, visible ? left.length : 8).map((item, index) => (
          <LeftSideLinks
            img={item.img}
            key={index}
            text={item.text}
            notification={item?.notification}
          />
        ))}
        {visible ? (
          <div
            onClick={() => setVisible(false)}
            className="flex justify-center px-2 hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors
            cursor-pointer py-2 xl:rounded-lg items-center space-x-2 xl:w-auto xl:h-auto xl:bg-transparent
            xl:justify-start font-semibold w-12 h-12 bg-gray-300 rounded-full"
          >
            <span className="p-2 rounded-full bg-gray-400 shrink-0">
              <ChevronUpIcon className="w-5" />
            </span>
            <span className="hidden xl:block">Show Less</span>
          </div>
        ) : (
          <div
            onClick={() => setVisible(true)}
            className="flex justify-center px-2 hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors
            cursor-pointer py-2 xl:rounded-lg items-center space-x-2 xl:w-auto xl:h-auto xl:bg-transparent
            xl:justify-start font-semibold w-12 h-12 bg-gray-300 rounded-full"
          >
            <span className="p-2 rounded-full bg-gray-400 shrink-0">
              <ChevronDownIcon className="w-5" />
            </span>
            <span className="hidden xl:block">See More</span>
          </div>
        )}
        <div className="h-[0.05rem] p-[0.5px] w-full bg-gray-400"></div>
        <div>
          <p className="hidden xl:block text-gray-800 font-semibold px-2 py-1">
            Your Shortcuts
          </p>
          <Link
            to="/"
            className="flex items-center justify-center xl:justify-start shrink-0 overflow-hidden space-x-2 font-semibold
          hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors rounded-full bg-gray-300 xl:bg-transparent
          w-12 h-12 xl:w-auto xl:h-auto xl:rounded-lg p-1"
          >
            <span className="w-11 h-11 p-1">
              <img
                src="assets/images/ytb.png"
                alt="youtube"
                className="rounded-lg"
              />
            </span>
            <span className="hidden xl:block text-sm">My YouTube Channel</span>
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center xl:justify-start shrink-0 overflow-hidden space-x-2 font-semibold
          hover:bg-gray-400 xl:hover:bg-gray-300 transition-colors rounded-full bg-gray-300 xl:bg-transparent
          w-12 h-12 xl:w-auto xl:h-auto xl:rounded-lg p-1"
          >
            <span className="w-10 h-10 p-1">
              <img
                src="assets/images/insta.png"
                alt="instagram"
                className="rounded-lg shrink-0"
              />
            </span>
            <span className="hidden xl:block text-sm">My Instagram Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBodyHome;

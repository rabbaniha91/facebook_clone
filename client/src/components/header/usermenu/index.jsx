import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatBubbleLeftEllipsisIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import SubUserMenu from "./subusermenu";
import TitleSubMenu from "./titlesubmenu";
import { subMenu } from "../../../data/allMenu";
import DisplayAccessbility from "./displayaccessbilbity";
import useAxiosPrivate from "../../../hooks/useaxiosprivate";
import logOutAction from "../../../redux/actions/logout";

const UserMenu = () => {
  const [visible, setVisible] = useState(0);
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const logOutHandle = () => {
    dispatch(logOutAction(axiosPrivate));
  };

  return (
    <div className="absolute top-12 right-2 p-4 w-80 lg:w-96 shadow-lg rounded-lg bg-gray-100 overflow-hidden">
      {visible === 0 && (
        <div>
          <div
            className="flex items-center justify-start space-x-2 py-1 px-2 hover:bg-gray-300 rounded-lg
          transition-colors cursor-pointer"
          >
            <div className="w-14 h-14 overflow-hidden flex rounded-full border-[1px] border-gray-100">
              <img
                src={user?.userInfo?.picture}
                alt="ProfilePicture"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold leading-4 text-gray-800">
                {user?.userInfo?.userName}
              </p>
              <p className="text-sm leading-4 text-gray-600">
                See Your Profile
              </p>
            </div>
          </div>
          <div className="devider my-2"></div>
          <div
            className="flex items-center justify-start space-x-2 p-2 hover:bg-gray-300 rounded-lg
          transition-colors cursor-pointer"
          >
            <div className="w-10 rounded-full bg-gray-200">
              <ChatBubbleLeftEllipsisIcon />
            </div>
            <div>
              <p className="text-gray-800 font-semibold leading-4">
                Give Feedback
              </p>
              <p className="text-gray-600 text-sm leading-4">
                Help us improve facebook
              </p>
            </div>
          </div>
          <div className="devider my-2"></div>
          <div
            className="flex justify-between items-center p-2 cursor-pointer rounded-lg hover:bg-gray-300
          transition-colors"
            onClick={() => setVisible(1)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 bg-gray-200 rounded-full p-2">
                <Cog8ToothIcon />
              </div>
              <p className="font-bold text-gray-800">Setting & Privacy</p>
            </div>
            <div className="w-8 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
            className="flex justify-between items-center p-2 cursor-pointer rounded-lg hover:bg-gray-300
          transition-colors"
            onClick={() => setVisible(2)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 bg-gray-200 rounded-full p-2">
                <QuestionMarkCircleIcon />
              </div>
              <p className="font-bold text-gray-800">Help & Support</p>
            </div>
            <div className="w-8 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
            className="flex justify-between items-center p-2 cursor-pointer rounded-lg hover:bg-gray-300
          transition-colors"
            onClick={() => setVisible(3)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 bg-gray-200 rounded-full p-2">
                <MoonIcon />
              </div>
              <p className="font-bold text-gray-800">Display & Accessibility</p>
            </div>
            <div className="w-8 p-1 text-gray-500">
              <ChevronRightIcon />
            </div>
          </div>
          <div
          onClick={logOutHandle}
            className="flex justify-between items-center p-2 cursor-pointer rounded-lg hover:bg-gray-300
          transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 bg-gray-200 rounded-full p-2">
                <ArrowLeftOnRectangleIcon />
              </div>
              <p className="font-bold text-gray-800">Log Out</p>
            </div>
          </div>
        </div>
      )}
      {visible === 1 && (
        <div className="px-3 space-y-2">
          <TitleSubMenu name="Setting & Privacy" setVisible={setVisible} />
          {subMenu.slice(0, 6).map((item, index) => (
            <SubUserMenu title={item.title} icon={item.icon} key={index} />
          ))}
        </div>
      )}
      {visible === 2 && (
        <div className="px-3 space-y-2">
          <TitleSubMenu name="Help & Support" setVisible={setVisible} />
          {subMenu.slice(6, 9).map((item, index) => (
            <SubUserMenu title={item.title} icon={item.icon} key={index} />
          ))}
        </div>
      )}
      {visible === 3 && (
        <div className="px-3 space-y-2">
          <TitleSubMenu name="Display & Accessbility" setVisible={setVisible} />
          <DisplayAccessbility />
        </div>
      )}
    </div>
  );
};

export default UserMenu;

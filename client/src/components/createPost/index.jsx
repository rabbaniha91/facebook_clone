import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { clearPostAction } from "../../redux/actions/postaction";

const CreatePost = ({ setVisibleCreatePost }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="mt-3 flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full">
        <div className="flex items-center space-x-2">
          <span className="h-12 w-12 shrink-0 rounded-full overflow-hidden block">
            <img src={user?.userInfo?.picture} alt="profile picture" />
          </span>
          <div
            onClick={() => {
              dispatch(clearPostAction());
              setVisibleCreatePost(true);
            }}
            className="py-2 px-4 cursor-pointer hover:bg-gray-200
          transition-colors grow rounded-full bg-gray-100 text-lg text-gray-600"
          >
            <p>What's on your mind, {user.userInfo?.firstName}</p>
          </div>
        </div>
        <div className="devider my-3"></div>
        <div className="flex justify-evenly items-center">
          <div
            className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl
            grow justify-center space-x-2 py-1"
          >
            <VideoCameraIcon className="w-8 text-red-500" />
            <span className="text-gray-800 font-semibold text-sm lg:text-lg">
              Live video
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl
            grow justify-center space-x-2 py-1"
          >
            <PhotoIcon className="w-8 text-green-500" />
            <span className="text-gray-800 font-semibold text-sm lg:text-lg">
              Photo/Video
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer transition-colors hover:bg-gray-100 rounded-xl
            grow justify-center space-x-2 py-1"
          >
            <FaceSmileIcon className="w-8 text-yellow-500" />
            <span className="text-gray-800 font-semibold text-sm lg:text-lg">
              Feeling/Activity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

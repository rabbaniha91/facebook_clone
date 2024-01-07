import {
  PhotoIcon,
  EllipsisHorizontalCircleIcon,
  TagIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";

import { FaceSmileIcon } from "@heroicons/react/24/outline";

const AddToPost = ({ setShowImagePost }) => {
  return (
    <div className="px-4">
      <div
        className="border-2 px-2 py-1 border-gray-200 flex flex-col sm:flex-row justify-between items-center
      rounded-lg"
      >
        <p className="text-lg font-semibold text-gray-800 grow mb-3 sm:mb-0">
          Add To Post
        </p>
        <div className="flex items-center space-x-4 sm:space-x-0 space-y-1 sm:space-y-0">
          <PhotoIcon
            onClick={() => setShowImagePost(true)}
            className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors text-green-600
        cursor-pointer"
          />
          <TagIcon
            className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors text-blue-600
        cursor-pointer"
          />
          <MicrophoneIcon
            className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors text-red-600
        cursor-pointer"
          />
          <EllipsisHorizontalCircleIcon
            className="w-10 p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500
        cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AddToPost;

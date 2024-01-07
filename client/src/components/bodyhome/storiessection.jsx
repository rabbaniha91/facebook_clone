import { PlusIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Story from './story';
import {stories} from '../../data/home';
import useScreenSize from '../../hooks/scrennsize';

const StoriesSection = () => {
    const {isMD, isSM} = useScreenSize()
    const storiesCount = isMD ? "5" : isSM ? "4" : "3"
  return (
    <div className="flex justify-center">
      <div className="inline-flex p-2 h-56 relative scale-90 sm:scale-100 space-x-3 justify-center">
        <div
          className="relative flex flex-col cursor-pointer max-w-[125px] min-w-[80px]
                shadow-sm rounded-lg overflow-hidden hover:scale-[1.05] transition-transform"
        >
          <div className="h-[70%] overflow-hidden">
            <img
              src="./assets/images/profile.png"
              alt="Create Story"
              className="object-cover
                        h-full brightness-75"
            />
          </div>
          <p className="flex justify-center items-center bg-white h-[30%] text-gray-800 text-sm">
            Create Story
          </p>
          <div
            className="absolute top-[70%] left-1/2 border-white border-4 bg-blue-500 p-1 rounded-full
          -translate-x-1/2 -translate-y-1/2"
          >
            <PlusIcon className="w-5 text-white" />
          </div>
        </div>
        {stories.slice(0, storiesCount).map((item, index) => (
          <Story
            img={item.image}
            profimg={item.profile_picture}
            profname={item.profile_name}
            key={index}
          />
        ))}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white hover:bg-gray-300 p-2
        cursor-pointer rounded-full transition-colors">
            <ArrowRightIcon className="w-6 text-gray-600"/>
        </div>
      </div>
    </div>
  );
};

export default StoriesSection;

import { useState, useRef } from "react";
import { postBgImages } from "../../data/postBackgrounds";
import { XMarkIcon } from "@heroicons/react/24/solid";

const BackgroundPost = ({ text, bgImage, setBgImage }) => {
  const bgRef = useRef(null);
  const postBgRef = useRef(null);
  const [showBgs, setShowBgs] = useState(false);

  const handleBgImageChenge = (index) => {
    setBgImage(postBgImages[index]);
    if (postBgRef.current) {
      postBgRef.current.style.backgroundImage = `url("${postBgImages[index]}")`;
    }
    bgRef.current.style.backgroundImage = `url("${postBgImages[index]}")`;
  };

  const handleBgImageRemove = () => {
    setBgImage(null);
    postBgRef.current.style.backgroundImage = "";
    bgRef.current.style.backgroundImage = "";
  };
  return (
    <div className="px-5 relative">
      <div
        ref={bgRef}
        className={`${
          bgImage ? "h-48 mb-2" : "h-32"
        }  bg-cover bg-center rounded-lg flex justify-center  items-center `}
      >
        <span
          className={`text-2xl ${
            (!text || !bgImage) && "hidden"
          }  relative text break-all rounded-lg  overflow-y-scroll  scrollbar-none inline-block w-auto 
          max-w-[85%] max-h-[60%] bg-gray-100 bg-blend-overlay bg-opacity-50  `}
          ref={postBgRef}
        >
          <span className=" h-full backdrop-blur-sm  backdrop-opacity-70 font-semibold text-gray-800 p-4 
          block">
            {text}
          </span>
        </span>
      </div>
      <div className="flex  w-[270px] sm:w-[320px] md:w-auto items-center overflow-hidden justify-start 
      space-x-1">
        <img
          onClick={() => setShowBgs((prev) => !prev)}
          src="/assets/images/colorful.png"
          className="w-10 h-10 shrink-0 select-none cursor-pointer "
          alt=""
        />
        <div
          className={`flex bg-gray-400 pt-2 sm:pb-2 mb-1 pl-2 rounded-2xl  overflow-hidden shadow-md 
          overflow-x-scroll scrollbar-thin   space-x-2 scrollbar-thumb-blue-200 pr-2 
          scrollbar-thumb-rounded-xl sm:scrollbar-none transition-transform m-auto ${
            !showBgs ? "hidden" : "flex"
          }`}
        >
          {postBgImages.map((image, index) => (
            <img
              onClick={() => handleBgImageChenge(index)}
              key={index}
              src={image}
              alt=""
              className="w-8 border-[1px] border-gray-200 h-8 select-none rounded-xl cursor-pointer 
              hover:scale-110 object-cover transition-transform"
            />
          ))}
        </div>
      </div>
      <div
        onClick={() => handleBgImageRemove()}
        className={`w-8 h-8 text-gray-700 hover:text-white transition-colors absolute top-3 right-8
      bg-gray-200 bg-opacity-60 rounded-full p-1 shrink-0 cursor-pointer hover:bg-red-600 ${
        !bgImage && "hidden"
      }`}
      >
        <XMarkIcon />
      </div>
    </div>
  );
};

export default BackgroundPost;

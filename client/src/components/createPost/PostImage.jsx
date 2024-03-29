import {
  XMarkIcon,
  DevicePhoneMobileIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

const PostImage = ({ setShowImagePost, images, setImages }) => {
  const imageRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAddRemove, setShowAddRemove] = useState(false);
  const removeImage = (i) => {
    let files = images.filter((_, index) => index !== i);
    setImages([...files]);
  };
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      let type = img.type.split("/")[1];
      if (!["jpeg", "png", "webp", "gif"].includes(type)) {
        files = files.filter((item) => item.name !== img.name);
        setErrorMsg(
          `${img.name} format is unsupported! only jpeg png webp and gif are allowed.`
        );
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== img.name);
        setErrorMsg(`${img.name} size is too large. max size is 5mb.`);
        return;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };

  return (
    <div className="px-4 relative">
      <input
        type="file"
        accept="image/jpeg image/png image/git image/webp"
        multiple
        hidden
        ref={imageRef}
        onChange={handleImage}
      />
      {images.length > 0 && showAddRemove && (
        <div
          onMouseMove={() => setShowAddRemove(true)}
          className="absolute top-4 left-8 z-30 flex flex-col items-center justify-center space-y-2"
        >
          <div
            onClick={() => imageRef.current?.click()}
            className="py-1 px-2 flex items-center text-gray-900 font-semibold space-x-2 bg-opacity-60
          cursor-pointer bg-white hover:bg-opacity-80 transition-all rounded-lg"
          >
            <img src="./assets/icons/addPhoto.png" alt="" className="w-6" />
            <span className="text-sm">Add photos</span>
          </div>
          <div
            onClick={() => setImages([])}
            className="py-1 px-2 flex items-center text-gray-900 font-semibold space-x-2 bg-opacity-60
          cursor-pointer bg-white hover:bg-opacity-80 transition-all rounded-lg"
          >
            <TrashIcon className="w-6" />
            <span className="text-sm">Remove all</span>
          </div>
        </div>
      )}
      <div className="rounded-lg border-gray-200 p-2 border-[1px]">
        <div
          onMouseLeave={() => setShowAddRemove(false)}
          onMouseMove={() => setShowAddRemove(true)}
          className={`${
            images?.length > 1 &&
            "overflow-scroll  scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400"
          } h-72 relative rounded-lg bg-gray-100 overflow-x-hidden`}
        >
          {images?.length ? (
            <div className="relative h-72">
              {images.map((img, index) => (
                <div
                  key={index}
                  className=" w-full h-full relative overflow-hidden rounded-md"
                >
                  <img
                    src={img}
                    alt=""
                    className=" object-cover w-full h-full"
                  />
                  <span
                    onClick={() => removeImage(index)}
                    className="w-8 h-8 text-gray-700 hover:text-white transition-colors absolute top-3 right-1
                                    bg-gray-200 bg-opacity-60 rounded-full p-1 shrink-0 cursor-pointer 
                                    hover:bg-red-600"
                  >
                    <XMarkIcon />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative flex flex-col h-full items-center justify-center">
              <div
                onClick={() => imageRef?.current?.click()}
                className="flex flex-col justify-center
              items-center cursor-pointer select-none"
              >
                <span
                  className=" w-16 h-16 p-4 rounded-full bg-gray-200 transition-colors cursor-pointer
                shrink-0 hover:bg-gray-300"
                >
                  <img src="./assets/icons/addPhoto.png" alt="" />
                </span>
                <p className="text-lg font-semibold">Add photos</p>
              </div>
              <span
                onClick={() => setShowImagePost(false)}
                className="w-8 h-8 text-gray-700 hover:text-white transition-colors absolute top-3 right-1
                                    bg-gray-200 bg-opacity-60 rounded-full p-1 shrink-0 cursor-pointer 
                                    hover:bg-red-600"
              >
                <XMarkIcon />
              </span>
            </div>
          )}
          <div
            className={`${
              errorMsg ? "translate-x-0" : "-translate-x-full"
            } bg-gray-300 transition-transform
          absolute inset-0 bg-opacity-90 flex flex-col p-10 space-y-8 space-x-2 items-center justify-center`}
          >
            <p className=" text-xl text-red-600">{errorMsg}</p>
            <button
              onClick={() => setErrorMsg("")}
              className="bg-blue-600 p-3 text-gray-100 cursor-pointer
             hover:bg-blue-700 transition-colors rounded-lg shadow-md"
            >
              Try again?
            </button>
          </div>
        </div>
        <div className=" flex justify-between items-center p-2 rounded-lg mt-2 bg-gray-100">
          <div className=" flex items-center font-semibold space-x-2">
            <div className=" w-10 h-10 p-2 bg-gray-200 rounded-full shrink-0">
              <DevicePhoneMobileIcon />
            </div>
            <p>Add photos from your mobile device</p>
          </div>
          <button
            className=" py-2 px-4 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300
            transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostImage;

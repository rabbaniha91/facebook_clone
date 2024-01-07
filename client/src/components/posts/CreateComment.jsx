import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  CameraIcon,
  GifIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EmojiPickerComponent from "../createPost/EmojiPicker";

const CreateComment = () => {
  const user = useSelector((state) => state?.user?.userInfo);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [commentImg, setCommentImg] = useState("");
  const imgRef = useRef(null);

  const handleImage = (e) => {
    let img = e.target.files[0];
    let type = img.type.split("/")[1];
    if (!["jpeg", "png", "webp", "gif"].includes(type)) {
      setErrorMsg(
        `{${img.name} format is unsupported! only jpeg png webp and gif are allowed.}`
      );
      return;
    } else if (img.size > 1024 * 1024 * 3) {
      setErrorMsg(`${img.name} size is too large. max size is 5mb.`);
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setCommentImg(readerEvent.target.result);
      };
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <img
          src={user?.picture}
          alt="profile picture"
          className="w-8 h-8 rounded-full"
        />
        <div className=" grow flex relative justify-between bg-gray-100 rounded-full px-3 items-center">
          <input
            type="text"
            placeholder="Write a comment"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" bg-transparent border-none focus:border-none focus:ring-0 text-gray-700 grow"
          />
          <div className=" text-gray-400 relative flex space-x-1">
            <EmojiPickerComponent
              text={text}
              setText={setText}
              textRef={textRef}
            />
            <CameraIcon
              onClick={() => imgRef.current.click()}
              className=" w-6 hover:text-blue-500 cursor-pointer transition-colors"
            />
            <input
              type="file"
              hidden
              ref={imgRef}
              accept="image/jpeg image/gif image/webp image/png"
              onChange={handleImage}
            />
            <GifIcon className=" w-6 hover:text-blue-500 cursor-pointer transition-colors" />
            <TagIcon className=" w-6 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
          {errorMsg && (
            <div className={`${errorMsg ? "translate-x-0" : "-translate-x-full"} transition-transform absolute
             px-3 bg-blue-200 items-center rounded-full flex inset-0 bg-opacity-90 justify-between`}>
              <span className=" text-red-500 text-sm leading-4 grow-1 mr-2">{errorMsg}</span>
              <button className=" bg-blue-500 text-sm text-gray-100 px-3 py-1 grow-0 rounded-lg shrink-0
              shadow-sm" onClick={() => setErrorMsg("")}>Try again</button>
            </div>
          )}
        </div>
      </div>
      {commentImg && (
        <div className=" relative inline-block mt-5 ">
          <img src={commentImg} alt="" className=" w-16 h-16 object-cover rounded-md"/>
          <div className="closeIcon w-5 h-5 absolute left-1 top-1 p-0 bg-opacity-70"
          onClick={() => setCommentImg("")}>
            <XMarkIcon className="w-4 h-4 text-gray-800"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;

import {
  XMarkIcon,
  GlobeAsiaAustraliaIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPickerComponent from "./EmojiPicker";
import BackgroundPost from "./BackgroundPost";
import AddToPost from "./AddToPost";
import PostImage from "./PostImage";
import PulseLoader from "../ui/PLoader";
import { clearPostAction, postAction } from "../../redux/actions/postaction";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { dataURLToBlob } from "blob-util";

const CreatePostPopup = ({ setVisibleCreatePost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const [bgImage, setBgImage] = useState(null);
  const [text, setText] = useState("");
  const [showImagePost, setShowImagePost] = useState(false);
  const [images, setImages] = useState([]);
  const textRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (
      (post?.postInfo?.images?.length > 0 ||
        post?.postInfo?.background ||
        post?.postInfo?.text) &&
      !post?.errorMessage
    ) {
      setVisibleCreatePost(false);
      navigate("/");
    }
  }, [
    post?.postInfo?.images,
    post?.postInfo?.background,
    post?.postInfo?.text,
    post?.errorMessage,
  ]);

  const sendPost = () => {
    if (bgImage) {
      dispatch(postAction(axiosPrivate, { text, background: bgImage }));
    } else if (images.length > 0) {
      const postImages = images.map((img) => dataURLToBlob(img));
      const path = `${user?.userInfo?.userName}/post images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((img) => {
        formData.append("file", img);
      });
      dispatch(postAction(axiosPrivate, { text, path }, formData));
    } else if (text) {
      dispatch(postAction(axiosPrivate, { text }));
      console.log(post);
    }
  };

  return (
    <div className="fixed bg-gray-200 bg-opacity-90 inset-0 p-8 z-40 flex scrollbar-none overflow-y-scroll">
      <div
        className="w-[70%] min-w-[320px] max-w-[600px] relative m-auto mt-20 bg-white rounded-lg
      shadow-lg overflow-hidden"
      >
        <div className="space-y-3">
          <div className="flex items-center p-2 px-4">
            <h1 className="grow text-center text-gray-800 font-semibold text-2xl">
              Create Post
            </h1>
            <span
              onClick={() => {
                setVisibleCreatePost(false);
              }}
              className="w-9 h-9 p-1 bg-gray-200 text-gray-600
                cursor-pointer flex items-center justify-center hover:text-white text-xl hover:bg-red-600 rounded-full transition-colors
                shrink-0"
            >
              <XMarkIcon className="w-8 h-8" />
            </span>
          </div>
          <div className="devider h-[2px]"></div>
          <div className="px-4 mt-2 flex space-x-2 items-center">
            <img
              src={user?.userInfo?.picture}
              alt="profile picture"
              className="w-12 h-12 border-gray-200
            shrink-0 rounded-full object-cover border-[1px]"
            />
            <div className="flex flex-col text-gray-700">
              <span className="font-semibold text-lg">
                {user?.userInfo?.firstName}
                {user?.userInfo?.lastName}
              </span>
              <span className="flex items-center justify-center select-none space-x-2 bg-gray-200 cursor-pointer rounded-lg px-2">
                <GlobeAsiaAustraliaIcon className="w-4" />
                <span>Public</span>
                <ArrowDownCircleIcon className="w-4" />
              </span>
            </div>
          </div>
          <div className="relative px-4">
            <textarea
              className={`w-full bg-gray-100 rounded-md pl-3 pr-10 py-3 h-20 resize-none overflow-y-scroll
            scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg
            text-[16px] text-gray-700 border-none focus:ring-0`}
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${user?.userInfo?.firstName}`}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <span className="absolute right-6 bottom-1">
              <EmojiPickerComponent
                text={text}
                setText={setText}
                textRef={textRef}
              />
            </span>
          </div>
          <div>
            {showImagePost ? (
              <PostImage
                setShowImagePost={setShowImagePost}
                images={images}
                setImages={setImages}
              />
            ) : (
              <BackgroundPost
                text={text}
                bgImage={bgImage}
                setBgImage={setBgImage}
              />
            )}
          </div>
          <AddToPost setShowImagePost={setShowImagePost} />
          <div className="px-4 pb-4">
            <button
              disabled={
                post?.isLoading || (!text && !bgImage && !images?.length > 0)
              }
              onClick={sendPost}
              className="bg-blue-600 w-full p-3 rounded-lg hover:shadow-none transition-colors hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300 shadow-blue-500 disabled:hover:bg-blue-300 shadow-md font-semibold text-gray-100"
            >
              {post?.isLoading ? (
                <PulseLoader isLoading={true} color="#fff" />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
        <div
          className={`${
            post?.errorMessage ? "translate-x-0" : "-translate-x-full"
          } bg-gray-300
        transition-transform absolute inset-0 bg-opacity-90 flex flex-col space-y-5 items-center justify-center space-x-2`}
        >
          <p className="text-red-600 text-xl">{post?.errorMessage}</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded-lg shadow-lg"
            onClick={() => {
              dispatch(clearPostAction());
            }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  GlobeAsiaAustraliaIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactsPopups from "./ReactsPopups";
import CreateComment from "./CreateComment";
import useClickOutSide from "../../hooks/useclickoutside";
import PostMenu from "./PostMenu";
const Post = React.forwardRef(({ post }, ref) => {
  const [reactVisible, setReactVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutSide(menuRef, () => setShowMenu(false));
  return (
    <div ref={ref} className=" bg-white rounded-lg shadow-md">
      <div className=" p-3 flex justify-between items-center">
        <Link
          className=" flex space-x-2 items-center text-gray-600 font-semibold"
          to={`/profile/${post?.user[0]?.userName || post?.user?.userName}`}
        >
          <img
            className=" rounded-full shrink-0 w-12 h-12 object-cover"
            src={post?.user[0]?.profilPic || post?.user?.profilPic}
            alt="profile picture"
          />
          <div className=" flex flex-col leading-4">
            <span>{post?.user[0]?.userName || post?.user?.userName}</span>
            <span className=" flex space-x-1 items-center justify-start">
              <Moment className="text-sm" fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              <GlobeAsiaAustraliaIcon className="w-4" />
            </span>
          </div>
        </Link>
        <div ref={menuRef}>
          <div
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <EllipsisHorizontalIcon
              className="w-10 text-gray-900 hover:bg-gray-200 transition-colors
                cursor-pointer rounded-full p-1"
            />
          </div>
          {showMenu && (
            <div className=" fixed right-6 top-8 z-50">
              <PostMenu post={post} />
            </div>
          )}
        </div>
      </div>
      {/* post content */}
      {post?.background ? (
        <div
          style={{ backgroundImage: `url('${post?.background}')` }}
          className=" xl:h-[500px] md:h-[400px] 
            sm:h-[350px] h-[300px] bg-cover bg-center flex items-center
            justify-center"
        >
          <span
            style={{ backgroundImage: `url('${post?.background}')` }}
            className=" text-lg relative break-all
            rounded-lg overflow-y-scroll scrollbar-none inline-block w-auto max-x-[85%] max-h-[60%] bg-gray-100
            bg-blend-overlay bg-opacity-50 font-semibold"
          >
            <span
              className=" h-full backdrop-blur-sm select-none backdrop-opacity-70 font-semibold
              text-gray-700 p-4 block"
            >
              {post?.text}
            </span>
          </span>
        </div>
      ) : (
        <>
          <div className=" text-lg select-none text-gray-700 px-4 py-2 border-y-gray-100 border-y">
            {post?.text}
          </div>
          {post?.images?.length > 0 && (
            <>
              <div
                className=" xl:h-[500px] md:h-[400px] sm:h-[350px] h-[300px] overflow-scroll overflow-x-hidden
            scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 relative bg-gray-100"
              >
                <div>
                  {post?.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative xl:h-[500px] md:h-[400px] sm:h-[350px] h-[300px]
                         w-full overflow-hidden"
                    >
                      <div className=" w-full h-full lazyImage">
                        <LazyLoadImage src={img?.url} effect="blur" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* post info */}
      <div className="flex justify-between py-2 px-4 text-gray-800 text-sm">
        <div className="flex space-x-1">
          <div>React Icons</div>
          <div>4</div>
        </div>
        <div className="flex space-x-5">
          <div>14 Comments</div>
          <div>5 Share</div>
        </div>
      </div>
      {/* post actios */}
      <div
        className=" text-gray-600 border-y border-gray-100 p-2 font-semibold flex
        justify-center"
      >
        <div
          onMouseMove={() => {
            setTimeout(() => {
              setReactVisible(true);
            }, 100);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setReactVisible(false);
            }, 500);
          }}
          className=" flex py-3 items-center justify-center rounded-lg cursor-pointer transition-colors
            space-x-3 grow hover:bg-gray-100 relative"
        >
          <img src="/assets/reacts/like.svg" alt="like" className="w-5" />
          <span>Like</span>
          <div className=" absolute bottom-full left-1">
            <ReactsPopups
              reactVisible={reactVisible}
              setReactVisible={setReactVisible}
            />
          </div>
        </div>
        <div
          className=" flex py-3 items-center justify-center rounded-lg cursor-pointer transition-colors
            space-x-3 grow hover:bg-gray-100"
        >
          <ChatBubbleLeftIcon className=" w-5" />
          <span>Comment</span>
        </div>
        <div
          className=" flex py-3 items-center justify-center rounded-lg cursor-pointer transition-colors
            space-x-3 grow hover:bg-gray-100"
        >
          <ShareIcon className=" w-5" />
          <span>Share</span>
        </div>
      </div>
      {/* comment */}
      <div className="py-2 px-4">
        <CreateComment />
      </div>
    </div>
  );
});

export default Post;

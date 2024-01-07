import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import LeftSideBodyHome from "./leftside";
import RightSideBodyHome from "./rightside";
import StoriesSection from "./storiessection";
import AccountVerifyModal from "./accountverifymodal";
import SendVerificationEmail from "./sendverificationemail";
import CreatePost from "../createPost";
import CreatePostPopup from "../createPost/createPostPopup";
import Posts from "../posts";

const BodyHome = () => {
  const { token } = useParams();
  const user = useSelector((state) => state.user);
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);

  return (
    <div className="flex items-start justify-center mt-16 h-screen">
      {token && <AccountVerifyModal token={token} />}
      {/* Left */}
      <div className="sm:w-16 lg:w-16 xl:w-56 shrink-0">
        <LeftSideBodyHome />
      </div>
      {/* Middle */}
      <div className="grow m-3 flex flex-col items-center">
        <StoriesSection />
        {!user?.userInfo?.verified && <SendVerificationEmail />}
        <CreatePost setVisibleCreatePost={setVisibleCreatePost} />
        {visibleCreatePost && (
          <CreatePostPopup setVisibleCreatePost={setVisibleCreatePost} />
        )}
        <Posts />
      </div>
      {/* Right */}
      <div className="lg:w-56 shrink-0">
        <RightSideBodyHome />
      </div>
    </div>
  );
};

export default BodyHome;

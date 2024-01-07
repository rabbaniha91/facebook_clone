import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import getProfileAction from "../../redux/actions/getProfileAction";
import { GET_PROFILE_CLEAR } from "../../redux/actions/type";

import Header from "../../components/header/header.jsx";
import BLoader from "../../components/ui/barloader";
import Cover from "../../components/profile/cover";
import OldCovers from "../../components/profile/OldCovers";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileMenu from "../../components/profile/ProfileMenu";
import Details from "../../components/profile/Details";
import CreatePost from "../../components/createPost";
import CreatePostPopup from "../../components/createPost/createPostPopup";
import MyPosts from "../../components/profile/MyPost";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const profile = useSelector((state) => state?.profile);
  const [showOldCovers, setShowOldCovers] = useState(false);
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getProfileAction(userName, axiosPrivate, signal));

    return () => {
      controller.abort();
      dispatch({ type: GET_PROFILE_CLEAR });
    };
  }, [userName, axiosPrivate, dispatch]);
  return (
    <div className="">
      <div className=" bg-white m-auto">
        <div className=" bg-white mt-14">
          <Header />
          {profile?.isLoading && <BLoader />}
          <Cover setShowOldCovers={setShowOldCovers} />
          <ProfileInfo />
        </div>
        {showOldCovers && <OldCovers setShowOldCovers={setShowOldCovers} />}
        <div className="devider"></div>
        <ProfileMenu />
      </div>
      <div
        className="flex flex-col md:flex-row md:items-start md:justify-center justify-center m-auto items-start 
      md:w-[98%] lg:w-[90%] "
      >
        <div className=" mt-3 p-2 lg:w-[500px] md:w-[400px] w-full z-30 lg:sticky lg:top-14 ">
          <Details />
        </div>
        <div className="md:grow mt-3 w-full">
          {/* create post */}
          <CreatePost setVisibleCreatePost={setVisibleCreatePost} />
          {visibleCreatePost && (
            <CreatePostPopup setVisibleCreatePost={setVisibleCreatePost}/>
          )}
          <MyPosts userName={userName}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;

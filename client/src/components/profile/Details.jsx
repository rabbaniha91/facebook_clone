import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { axiosPrivate } from "../../axios/axios";
import { CHANGE_PROFILE_DETAILS } from "../../redux/actions/type";
import {AcademicCapIcon, BriefcaseIcon, HeartIcon, HomeIcon} from '@heroicons/react/24/solid';
import EditDetails from "./EditDetails";

const Details = () => {
  const userDetails = useSelector(
    (state) => state?.profile?.profileInfo?.details
  );
  const userProfile = useSelector((state) => state?.profile?.profileInfo);
  const user = useSelector((state) => state?.user?.userInfo);
  const [bioLength, setBioLength] = useState(100 - userDetails?.bio?.length);
  const [bioText, setBioText] = useState(userDetails?.bio);
  const [showBio, setShowBio] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const axiosprivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const updateBio = async () => {
    try {
      await axiosPrivate.post("/user/updateDetails", {
        bio: bioText,
      });
      dispatch({
        type: CHANGE_PROFILE_DETAILS,
        payload: { details: { bio: bioText } },
      });
      setShowBio(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isMyProfile = user?.userName === userProfile?.userName;
  return (
    <div className=" bg-white rounded-lg shadow-sm p-3">
      <div>
        <h4 className=" text-gray-700 text-xl font-semibold">Intro</h4>
        <p className="text-gray-700 py-2 pl-1">{userDetails?.bio}</p>
        {!showBio && isMyProfile && (
          <button
            onClick={() => setShowBio(true)}
            className=" bg-gray-100 w-full mb-2 p-2 rounded-lg text-gray-700 font-semibold
             hover:bg-gray-200 transition-colors ring-1 ring-gray-300"
          >
            {userDetails?.bio ? "Edit" : "Add"} Bio
          </button>
        )}
        {showBio && (
          <div className="flex flex-col">
            <textarea
              maxLength={100}
              placeholder="Add Bio"
              className=" rounded-md bg-gray-100 h-20 mt-2 text-gray-700"
              value={bioText}
              onChange={(e) => {
                setBioLength(100 - e.target.value.length);
                setBioText(e.target.value);
              }}
            />
            {bioLength > 0 && (
              <span className=" self-end text-sm text-gray-500">
                {bioLength} Charcters remaining
              </span>
            )}
            <div className=" flex items-center self-end space-x-4 mt-5 mb-2 pr-3">
              <button
                onClick={() => setShowBio(false)}
                className=" bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors
               font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateBio}
                className="bg-blue-600 text-gray-200 hover:bg-blue-700 transition-colors
               font-semibold py-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {userDetails?.workPlace && userDetails?.job && (
          <div className=" flex space-x-1 px-2 py-1">
            <BriefcaseIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">
              work as {userDetails?.job} at {userDetails?.workPlace}
            </span>
          </div>
        )}
        {userDetails?.rel && (
          <div className=" flex space-x-1 px-2 py-1">
            <HeartIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">{userDetails?.rel}</span>
          </div>
        )}
        {userDetails?.college && (
          <div className=" flex space-x-1 px-2 py-1">
            <AcademicCapIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">
              Sudied at {userDetails?.college}
            </span>
          </div>
        )}
        {userDetails?.highSchool && (
          <div className=" flex space-x-1 px-2 py-1">
            <AcademicCapIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">
              Sudied at {userDetails?.highSchool}
            </span>
          </div>
        )}
        {userDetails?.currentCity && (
          <div className=" flex space-x-1 px-2 py-1">
            <HomeIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">
              Lives in {userDetails?.currentCity}
            </span>
          </div>
        )}
        {userDetails?.homeTwon && (
          <div className=" flex space-x-1 px-2 py-1">
            <HomeIcon className="w-5 text-gray-500" />
            <span className=" text-gray-800">From {userDetails?.homeTwon}</span>
          </div>
        )}
        {userDetails?.instageram && (
          <a
            href={`https://www.instagram.com/${userDetails?.instageram}`}
            target="_blank"
            rel="noreference"
            className="flex space-x-1 px-2 py-1"
          >
            <img
              src="/assets/icons/instagram.png"
              alt="instageram"
              className="w-6 h-6 text-gray-50"
            />
            <span className=" text-gray-800">{userDetails?.instageram}</span>
          </a>
        )}
        {isMyProfile && (
          <button
            onClick={() => setShowDetails(true)}
            className="bg-gray-100 w-full mb-2 p-2 rounded-lg text-gray-700 font-semibold
             hover:bg-gray-200 transition-colors ring-1 ring-gray-300"
          >
            Edit details
          </button>
        )}
      </div>
      {showDetails && <EditDetails setShowDetails={setShowDetails} />}
    </div>
  );
};

export default Details;

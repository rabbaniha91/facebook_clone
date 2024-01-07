import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_PROFILE_PICTURE,
  CHANGE_USER_PICTURE,
} from "../../redux/actions/type";
import {
  ComputerDesktopIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FadeLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CropProfilePicture from "./CropProfilePicture";

const UpdateProfilePicture = ({ setShowUpdateProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userInfo);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const imageInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const cotroller = new AbortController();
    const { signal } = cotroller;
    setIsLoading(true);
    axiosPrivate
      .post(
        "/user/profileImages",
        {
          path: `${user?.userName}/profile_pictures`,
          max: 20,
          sort: "desc",
        },
        { signal }
      )
      .then(({ data }) => {
        setImages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (signal.aborted) return;
        setErrorMsg(err?.response?.data?.message);
      });
  }, []);

  const changeProfilePicture = (e) => {
    const url = e.target.src;
    axiosPrivate
      .post("/user/profileUpdate", { url })
      .then(({ data }) => {
        dispatch({ type: CHANGE_PROFILE_PICTURE, payload: { picture: data } });
        dispatch({ type: CHANGE_USER_PICTURE, payload: { picture: data } });
        setShowUpdateProfile(false);
      })
      .catch((err) => setErrorMsg(err?.response?.data?.message));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMsg(`${file?.name} format not supported`);
      setProfilePicture("");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setErrorMsg(`${file?.name} is so large. only 2mb is allowed.`);
      setProfilePicture("");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
    }
  };
  return (
    <div className=" absolute inset-0 z-50 bg-opacity-80 bg-white">
      <div
        className=" absolute w-[336px] sm:w-[440px] lg:w-[544px] shadow-lg rounded-lg bg-white top-1/2
       left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className=" flex justify-between p-3">
          <span className=" text-lg text-gray-700 font-semibold">
            Update Profile Picture
          </span>
          <span className=" closeIcon">
            <XMarkIcon
              onClick={() => setShowUpdateProfile(false)}
              className=" w-6"
            />
          </span>
        </div>
        <div className="devider"></div>
        <div className=" flex justify-evenly space-x-2 p-2">
          <button
            onClick={() => imageInputRef.current.click()}
            className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-500 px-3
             py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer grow font-bold"
          >
            <PlusIcon className=" w-5" />
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            accept="image/jpeg image/png image/webp"
            onInput={handleImage}
            onClick={(e) => (e.target.value = null)}
            ref={imageInputRef}
            hidden
          />
          <button
            className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 px-3
             py-2 rounded-lg transition-colors cursor-pointer grow font-bold"
          >
            <ComputerDesktopIcon className=" w-5" />
            <span>Add frame</span>
          </button>
        </div>
        <p
          className=" p-2 mt-4 font-semibold text-lg text-center text-blue-600 border-b-blue-500
         border-b-4"
        >
          Recent Profile Pictures
        </p>
        <div
          className="overflow-y-scroll relative overflow-x-hidden space-y-2 flex flex-wrap justify-start items-center
         content-start h-[450px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full p-3"
        >
          {isLoading && (
            <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <FadeLoader color="#3867d6" size={82} />
            </span>
          )}
          {images.map((image) => (
            <span
              key={image.id}
              className=" w-24 h-24 rounded-xl mr-2 overflow-hidden cursor-pointer hover:scale-110
             transition-transform"
            >
              <LazyLoadImage
                effect="blur"
                src={image.url}
                onClick={changeProfilePicture}
                alt="cover images"
                className="object-cover w-24 h-24"
              />
            </span>
          ))}
        </div>
      </div>
      {profilePicture && (
        <CropProfilePicture
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          setImages={setImages}
        />
      )}
    </div>
  );
};

export default UpdateProfilePicture;

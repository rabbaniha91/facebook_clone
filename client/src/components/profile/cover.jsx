import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import useClickOutSide from "../../hooks/useclickoutside";
import { SET_COVER_CLEAR } from "../../redux/actions/type";
import getCroppedImage from "../../helpers/coverImage";
import setCoverAction from "../../redux/actions/setCover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Cropper from "react-easy-crop";
import PulseLoader from "../ui/PLoader";
import {
  ArrowDownTrayIcon,
  CameraIcon,
  GlobeAsiaAustraliaIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const Cover = ({ setShowOldCovers }) => {
  const profileInfo = useSelector((state) => state?.profile?.profileInfo);
  const user = useSelector((state) => state?.user?.userInfo);
  const cover = useSelector((state) => state?.cover);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const inputImageRef = useRef(null);
  const coverRef = useRef(null);
  const coverMenuRef = useRef(null);
  const [coverPictuer, setCoverPicture] = useState("");
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let isProfileUser = profileInfo?.userName === user?.userName;
  useClickOutSide(coverMenuRef, () => setShowCoverMenu(false));

  // if (cover?.success) {
  //   setCoverPicture("");
  //   dispatch({ type: SET_COVER_CLEAR });
  // }

  const handleImage = (e) => {
    setShowCoverMenu(false);
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMsg(`${file?.name} format not supported`);
      setCoverPicture("");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setErrorMsg(`${file?.name} is so large. only 2mb is allowed.`);
      setCoverPicture("");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setCoverPicture(e.target.result);
      };
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cancelCoverChange = () => {
    setCoverPicture("");
  };

  const updateCover = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;
      const img = await getCroppedImage(coverPictuer, croppedAreaPixels);
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user?.userName}/cover_picture`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      dispatch(setCoverAction(formData, axiosPrivate, signal, setCoverPicture));
    } catch (error) {
      setErrorMsg("Error in crop and update cover");
    }
  };

  return (
    <div ref={coverRef} className=" h-96 w-full relative m-auto">
      <div className=" lazyImage w-full lg:rounded-br-xl lg:rounded-bl-xl overflow-hidden h-full">
        <LazyLoadImage
          src={coverPictuer || profileInfo?.cover}
          effect="blur"
          alt="cover"
        />
      </div>
      <input
        type="file"
        accept="image/jpeg image/png image/webp"
        onInput={handleImage}
        onClick={(e) => (e.target.value = null)}
        ref={inputImageRef}
        hidden
      />
      {isProfileUser && (
        <div
          className=" absolute z-40 text-gray-700 right-5 bg-opacity-90 bg-gray-100 cursor-pointer
         rounded-lg bottom-16"
          ref={coverMenuRef}
        >
          <div className=" relative w-44">
            <div
              className=" flex items-center p-2 space-x-2"
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <CameraIcon className=" w-6 h-6" />
              <span className=" font-semibold">Add cover photo</span>
            </div>
            {showCoverMenu && (
              <div
                className=" absolute flex flex-col bg-white shadow-md left-0 overflow-hidden rounded-lg
               top-[52px] w-full"
              >
                <div
                  onClick={() => setShowOldCovers(true)}
                  className=" flex hover:bg-blue-100 items-center space-x-2 p-2 transition-colors"
                >
                  <PhotoIcon className="w-6 h-6" />
                  <span>Select Photo</span>
                </div>
                <div
                  className="flex hover:bg-blue-100 items-center space-x-2 p-2 transition-colors"
                  onClick={() => inputImageRef.current.click()}
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  <span>Upload Photo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {(coverPictuer || cover?.isLoading) && (
        <>
          <Cropper
            image={coverPictuer}
            zoom={zoom}
            crop={crop}
            aspect={coverRef.current?.getBoundingClientRect().width / 384}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
          />
          <div
            className=" absolute w-full top-0 bg-gray-800 bg-opacity-80 flex text-gray-200 justify-between
           items-center py-2 px-4"
          >
            <div className=" flex items-center space-x-2">
              <GlobeAsiaAustraliaIcon className=" w-8" />
              <span>Your cover photo is public</span>
            </div>
            <div className=" flex space-x-4">
              {!cover?.isLoading && (
                <button
                  onClick={cancelCoverChange}
                  className=" bg-gray-600 py-2 font-semibold px-6 hover:text-red-400
               transition-colors cursor-pointer rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={updateCover}
                className=" bg-blue-500 rounded-lg font-semibold py-2 px-6 hover:bg-blue-600
                transition-colors cursor-pointer"
              >
                {cover?.isLoading ? (
                  <PulseLoader color="#FFF" size={5} />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {(errorMsg || cover?.errorMessage) && (
        <div className=" absolute inset-0 overflow-hidden lg:rounded-br-lg lg:rounded-bl-lg">
          <div className=" bg-white opacity-90 w-full h-full flex justify-around items-center">
            <span className=" text-red-600 text-lg">
              {errorMsg || cover?.errorMessage}
            </span>
            <button
              className=" p-2 w-32 bg-blue-500 text-gray-100 font-semibold rounded-lg hover:bg-blue-700
             transition-colors cursor-pointer"
              onClick={() => {
                setErrorMsg("");
                dispatch({ type: SET_COVER_CLEAR });
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cover;

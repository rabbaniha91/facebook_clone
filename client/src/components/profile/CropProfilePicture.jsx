import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import getCroppedImage from "../../helpers/coverImage";
import setProfilePictureAction from "../../redux/actions/setprofilePicture";
import uniqueId from "uniqueid";
import {
  ClockIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Cropper from "react-easy-crop";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const CropProfilePicture = ({
  profilePicture,
  setProfilePicture,
  setImages,
}) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cropAreaPixels, setCropAreaPixels] = useState(null);
  const navigate = useNavigate();
  const sliderRef = useRef();

  const onCropComplete = useCallback((_, cropAreaPixels) => {
    setCropAreaPixels(cropAreaPixels);
  }, []);

  const cropPhoto = async () => {
    try {
      const img = await getCroppedImage(profilePicture, cropAreaPixels);
      setProfilePicture(img);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (error) {
      setErrorMsg("Error in crop");
    }
  };

  const zoomIn = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current?.value);
  };
  const zoomOut = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current?.value);
  };

  const updatePicture = async () => {
    try {
      setIsLoading(true);
      const img = await getCroppedImage(profilePicture, cropAreaPixels);
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user?.userName}/profile_pictures`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      dispatch(setProfilePictureAction(formData, axiosPrivate));
      setImages((prev) => [{ id: uniqueId("profile"), url: img }, ...prev]);
      setIsLoading(false);
      setSuccessMsg("Profile Picture Update Successfully");
      navigate(`/profile/${user?.userName}`);
    } catch (error) {
      setErrorMsg("Error in crop and update picture");
      setIsLoading(false);
    }
  };
  return (
    <div className=" absolute inset-0 bg-gray-50 bg-opacity-95 ">
      <div
        className=" absolute bg-white w-[320px] sm:w-[500px] shadow-lg rounded-lg top-[50%]
       left-[50%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className=" p-3 flex justify-between items-center text-gray-600">
          <p className=" text-lg font-bold">Update Profile Picture</p>
          <span onClick={() => setProfilePicture("")} className=" closeIcon">
            <XMarkIcon className=" w-5" />
          </span>
        </div>
        <div className=" devider"></div>
        <div className=" relative h-[400px] ">
          <Cropper
            image={profilePicture}
            zoom={zoom}
            crop={crop}
            aspect={1 / 1}
            cropShape="round"
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
            showGrid={false}
          />
        </div>
        <div className=" p-3 flex items-center justify-between space-x-4">
          <MinusCircleIcon
            onClick={zoomOut}
            className="w-7 text-gray-600 hover:text-gray-800 transition-colors
           cursor-pointer"
          />
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={zoom}
            ref={sliderRef}
            onChange={(e) => setZoom(e.target.value)}
            className=" w-full h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none"
          />
          <PlusCircleIcon
            onClick={zoomIn}
            className="w-7 text-gray-600 hover:text-gray-800 transition-colors
           cursor-pointer"
          />
        </div>
        <div className=" flex justify-center space-x-3 my-4">
          <button
            className=" flex space-x-2 items-center bg-gray-100 py-2 px-3 text-gray-700 font-semibold
             rounded-lg hover:bg-gray-200 transition-colors cursor-pointer ring-1 ring-gray-300"
            onClick={cropPhoto}
          >
            <img
              src="/assets/icons/crop.png"
              alt="crop"
              className=" w-5 h-5 opacity-90"
            />
            <span>Crop Photo</span>
          </button>
          <button
            className=" flex space-x-2 items-center bg-gray-100 py-2 px-3 text-gray-700 font-semibold
             rounded-lg hover:bg-gray-200 transition-colors cursor-pointer ring-1 ring-gray-300"
          >
            <ClockIcon className="w-5 h-5" />
            <span>Make Temporary</span>
          </button>
        </div>
        {successMsg && (
          <div className=" text-green-600 mb-2 text-lg text-center">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className=" text-red-600 mb-2 text-lg text-center">
            {successMsg}
          </div>
        )}
        <div className="devider"></div>
        <div className=" flex justify-end space-x-3 p-5">
          {!isLoading && (
            <button
              onClick={() => setProfilePicture("")}
              className="flex items-center justify-center space-x-2  text-blue-400 px-3
             py-2 rounded-lg hover:text-blue-700 font-semibold  transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={updatePicture}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-gray-100 px-3
             py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {isLoading ? <PulseLoader color="#fff" size={5} /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropProfilePicture;

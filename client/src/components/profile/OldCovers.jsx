import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { CHANGE_PROFILE_COVER } from "../../redux/actions/type";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FadeLoader } from "react-spinners";
import useClickOutSide from "../../hooks/useclickoutside";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OldCovers = ({ setShowOldCovers }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showCoversRef = useRef(null);
  useClickOutSide(showCoversRef, () => setShowOldCovers(false));

  const updateCover = (e) => {
    console.log(e.target.src);
    const url = e.target.src;
    if (!url) return;
    axiosPrivate.post("/user/coverUpdate", { url }).then(({ data }) => {
      dispatch({ type: CHANGE_PROFILE_COVER, payload: { cover: data } });
    });
    setShowOldCovers(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    axiosPrivate
      .post(
        "/user/CoverImages",
        { path: `${user?.userName}/cover_picture`, max: 20, sort: "desc" },
        { signal }
      )
      .then(({ data }) => {
        setImages(data);
        setIsLoading(false);
      });

    // return () => {
    //   controller.abort();
    // };
  }, [user?.userName, axiosPrivate]);

  return (
    <div className=" bg-gray-100 z-50 bg-opacity-90 absolute flex items-center justify-center inset-0">
      <div className=" w-[232px] sm:w-[336px] lg:w-[440px] text-gray-700 rounded-lg shadow-md bg-white">
        <div className=" flex justify-between items-center p-3">
          <span className=" font-semibold text-lg">Select Cover Photo</span>
          <div className="closeIcon" onClick={() => setShowOldCovers(false)}>
            <XMarkIcon className="w-5" />
          </div>
        </div>
        <div className="devider"></div>
        <p
          className="flex justify-center font-semibold border-b-blue-600 border-b-4 py-2
         text-lg text-blue-600"
        >
          Recent cover photos
        </p>
        <div
          className=" overflow-y-scroll relative overflow-x-hidden space-y-2 flex flex-wrap justify-start items-center
         content-start h-[450px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full p-3"
        >
          {isLoading && (
            <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
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
                onClick={updateCover}
                alt="cover images"
                className="object-cover w-24 h-24"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OldCovers;

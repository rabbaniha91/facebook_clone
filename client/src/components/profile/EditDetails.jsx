import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import UpdateDetails from "./UpdateDetails";

const EditDetails = ({ setShowDetails }) => {
  const userDetails = useSelector(
    (state) => state?.profile?.profileInfo?.details
  );
  return (
    <div className="fixed z-50 bg-gray-100 bg-opacity-90 inset-0">
      <div
        className=" absolute w-[320px] sm:w-[350px] md:w-[400px]  top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2
       shadow-lg rounded-lg bg-white "
      >
        <div className=" p-3 flex justify-between items-center">
          <span className=" text-xl font-semibold text-gray-700">
            Edit Details
          </span>
          <span onClick={() => setShowDetails(false)} className="closeIcon">
            <XMarkIcon className="w-8 h-8" />
          </span>
        </div>
        <div className=" devider"></div>
        <div
          className="p-3 h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full
         scrollbar-thumb-gray-200 scrollbar-track-gray-400 scrollbar-track-rounded-full"
        >
          <div className=" leading-5 mb-2">
            <h3 className=" text-gray-800 text-[18px] font-semibold">
              Customize your intro
            </h3>
            <p className=" text-[14px] text-gray-500">
              Details you select will be public
            </p>
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Other name</p>
            <UpdateDetails
              fieldName="othername"
              defaultText="Add othername"
              iconName="academicCap"
              max={20}
              text={userDetails?.othername}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Work</p>
            <UpdateDetails
              fieldName="job"
              defaultText="Add Job"
              iconName="briefCase"
              max={30}
              text={userDetails?.job}
            />
            <UpdateDetails
              fieldName="workPlace"
              defaultText="Add Workplace"
              iconName="briefCase"
              max={40}
              text={userDetails?.workPlace}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Education</p>
            <UpdateDetails
              fieldName="highSchool"
              defaultText="Add HighSchool"
              iconName="academicCap"
              max={30}
              text={userDetails?.highSchool}
            />
            <UpdateDetails
              fieldName="college"
              defaultText="Add college"
              iconName="academicCap"
              max={40}
              text={userDetails?.college}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Current City</p>
            <UpdateDetails
              fieldName="currentCity"
              defaultText="Add Current City"
              iconName="home"
              max={20}
              text={userDetails?.currentCity}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Home Twon</p>
            <UpdateDetails
              fieldName="homeTwon"
              defaultText="Add home twon"
              iconName="home"
              max={20}
              text={userDetails?.homeTwon}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Relationship</p>
            <UpdateDetails
              fieldName="rel"
              defaultText={[
                "Single",
                "In a relationship",
                "Married",
                "Divorced",
              ]}
              iconName="heart"
              max={20}
              text={userDetails?.rel}
            />
          </div>
          <div className=" py-1">
            <p className=" text-[16px] font-bold">Instagram</p>
            <UpdateDetails
              fieldName="instageram"
              defaultText="Add instageram"
              iconName="instageram"
              max={20}
              text={userDetails?.instageram}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;

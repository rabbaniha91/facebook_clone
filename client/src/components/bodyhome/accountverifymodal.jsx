import { ScaleLoader } from "react-spinners";
import useClickOutSide from "../../hooks/useclickoutside";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import verifyAction from "../../redux/actions/verifyAction";

const AccountVerifyModal = ({ token = "" }) => {
  const [showModal, setShowModal] = useState(!!token);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const verifyAccount = useSelector((state) => state?.verifyAccount);

  useEffect(() => {
    if (token) dispatch(verifyAction(token, axiosPrivate));
    const timer = setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [axiosPrivate, dispatch, token, navigate]);

  useClickOutSide(modalRef, () => {
    setShowModal(false);
  });

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center  bg-gray-200 bg-opacity-90 z-10">
          <div
            ref={modalRef}
            className="w-80 h-52 flex flex-col items-center rounded-lg shadow-md  bg-white "
          >
            <p
              className={`p-3 font-semibold text-lg ${
                verifyAccount?.errorMessage ? "text-red-600" : "text-green-600"
              } `}
            >
              {verifyAccount?.errorMessage
                ? "Account verification failed"
                : "Account verification succeded"}
            </p>
            <div className="devider"></div>
            <p className="p-3 mt-2 text-md text-center text-gray-800">
              {verifyAccount?.errorMessage
                ? verifyAccount.errorMessage
                : "Account Accounst has been activated successfully "}
            </p>
            <div className="mt-6">
              <ScaleLoader
                loading={true}
                color={verifyAccount?.errorMessage ? "#EA2027" : "#2ecc71"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountVerifyModal;

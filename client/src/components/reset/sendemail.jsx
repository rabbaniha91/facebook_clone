import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  resetEmailAction,
  resetPasswordCancel,
} from "../../redux/actions/resetpasswordaction";
import { useEffect } from "react";
import BLoader from "../ui/barloader";

const SendEmail = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state.resetPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetPasswordCancel());
    setVisible(1);
    navigate("/login");
  };

  const handleSendMail = () => {
    dispatch(resetEmailAction(resetPassword?.email));
  };

  useEffect(() => {
    if (resetPassword?.mailSuccess) setVisible(3);
  }, [resetPassword?.mailSuccess, setVisible]);
  return (
    <div className="bg-white lg:w-[600px] sm:w-[500px] p-4 rounded-lg shodow-md">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="py-2 text-gray-800 text-xl font-semibold">
        Reset Your Password
      </h3>
      <div className="devider"></div>
      <div className="sm:flex sm:justify-around sm:space-x-2 flex flex-col sm:flex-row space-y-8 sm:space-y-0 mt-8">
        <div className="flex flex-col space-y-9 w-56">
          <p className="text-gray-800">
            How do you want to receive the code to reset your password?
          </p>
          <label className="text-gray-800">
            <input
              type="radio"
              name="email"
              defaultChecked={true}
              className="mr-1"
            />
            <span className="text-gray-600 leading-4">Send code via email</span>
            <span className="text-gray-900 block pl-5 leading-4">
              {resetPassword?.email}
            </span>
          </label>
        </div>
        <div className="flex flex-col  justify-start items-center">
          <img
            src={resetPassword?.picture}
            alt="profile picture"
            className="w-16 h-16  rounded-full object-cover border-2 border-gray-200"
          />
          <span className="text-gray-800 text-sm p-1 font-semibold">
            {resetPassword?.email}
          </span>
          <span className="text-gray-800 text-sm font-semibold">
            Facebook User
          </span>
        </div>
      </div>
      {resetPassword?.errorMessage && (
        <div className="p-2 text-center text-red-500 mt-3 font-semibold">
          {resetPassword.errorMessage}
        </div>
      )}
      
        <div className="flex space-x-10 items-center justify-end ">
          <Link
            to="/login"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          >
            Not You?
          </Link>
          <button
            onClick={handleSendMail}
            className="px-4 py-2 rounded-lg bg-blue-600 text-gray-100 font-semibold hover:bg-blue-700 shadow-md shadow-blue-300 hover:shadow-none transition-colors"
          >
            Continue
          </button>
        </div>
      
    </div>
  );
};

export default SendEmail;

import { useState } from "react";
import useAxiosPrivate from "../../hooks/useaxiosprivate";

const SendVerificationEmail = () => {
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const sendVerificationEmail = async () => {
    try {
      const { data } = await axiosPrivate.post("/user/reSendVerification");
      setSuccess(data.message);
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Server not respond");
      } else if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage("Failed to send activation email");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-96 lg:w-full m-3">
      <div className="bg-white p-4 lg:text-lg text-sm rounded-lg shadow-md w-full">
        <p className="text-gray-800 p-1">
          Your account is not verified. verify your account before it gets
          deleted after a month from creating
        </p>
        <span
          className="p-1 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer hover:underline"
          onClick={() => sendVerificationEmail()}
        >
          Click here to resend verification link{" "}
        </span>
        {success && (
          <div className="text-green-600 p-1 font-semibold">{success}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 p-1 font-semibold">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default SendVerificationEmail;

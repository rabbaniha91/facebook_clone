import { useState } from "react";
import { Link } from "react-router-dom";
import SearchAccount from "../../components/reset/searchaccount";
import SendEmail from "../../components/reset/sendemail";
import CodeVerification from "../../components/reset/codeverification";
import ChangePassword from "../../components/reset/changepassword";

const Reset = () => {
  const [visible, setVisible] = useState(1);
  return (
    <div>
      <div
        className="flex justify-between items-center fixed top-0 left-0 z-50 w-full h-14
      bg-white shadow-md px-6"
      >
        <img
          src="./assets/images/Facebook_Logo_(2019).svg"
          alt="facebook logo"
          className="w-32"
        />
        <Link
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 shadow-md rounded-lg text-gray-100
        font-semibold transition-colors"
          to="/login"
        >
          Login
        </Link>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {visible === 1 && <SearchAccount setVisible={setVisible} />}
        {visible === 2 && <SendEmail setVisible={setVisible} />}
        {visible === 3 && <CodeVerification setVisible={setVisible} />}
        {visible === 4 && <ChangePassword setVisible={setVisible} />}
      </div>
    </div>
  );
};

export default Reset;

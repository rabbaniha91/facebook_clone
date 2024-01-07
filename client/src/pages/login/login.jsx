import { Link } from "react-router-dom";
import LoginForm from "../../components/loginform/loginform.jsx";
const Login = () => {
  return (
    <>
      <div
        className="flex flex-col lg:flex-row lg:justify-around justify-between space-y-3 p-8 lg:mx-20
            2xl:mx-60 xl:mx-32 items-center h-screen bg-gray-200"
      >
        <div className="flex flex-col justify-center items-center lg:items-start  lg:mt-0">
          <img
            className="w-80 mt-6"
            src="./assets/images/Facebook_Logo_(2019).svg"
            alt="facebook"
          />
          <p className="font-normal w-[22rem] lg:w-auto leading-10 p-1 text-center lg:text-left lg:text-[1.8rem] text-gray-700 text-2xl mt-10 ">
            Facebook help you connect and share with the people in your life
          </p>
        </div>
        <div>
          <LoginForm />
          <Link
            to="/"
            className="w-[22rem] text-center block p-4 cursor-pointer"
          >
            <span className="font-bold text-sm w-80">Create apage</span>
            <span className="text-sm"> for celebrity, brand or business</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;

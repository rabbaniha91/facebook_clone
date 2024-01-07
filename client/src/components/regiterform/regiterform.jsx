import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../errormessage.jsx";
import useScreenSize from "../../hooks/scrennsize.js";
import BarLoader from "../ui/barloader.jsx";
import registerAction from "../../redux/actions/register.js";
import { useSelector, useDispatch } from "react-redux";
import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { isLG } = useScreenSize();
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your First Name?")
      .min(4, "Must be at least 3 chracters"),
    lastName: Yup.string()
      .required("What's your Last Name?")
      .min(4, "Must be at least 3 chracters"),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email("Invalid email address"),
    password: Yup.string()
      .required(
        "The password must be a combination of uppercase and lowercase English letters, numbers and special characters such as(!,@,#,$,%,^,&,*)"
      )
      .min(8, "Password must be 8 chracters")
      .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/, "Password week"),
  });

  const permissibleAge = new Date().getFullYear() - 18;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bYear: permissibleAge,
      bMonth: new Date().getMonth() + 1,
      bDay: new Date().getDate(),
      gender: "male",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      dispatch(registerAction(values));
      navigate("/login")
    },
  });

  const years = Array.from(
    new Array(permissibleAge - 1939),
    (_, index) => permissibleAge - index
  );

  const months = Array.from(new Array(12), (_, index) => 1 + index);

  const getDayMonth = () => {
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate();
  };

  const days = Array.from(new Array(getDayMonth()), (_, index) => 1 + index);

  return (
    <div className="shadow-md p-4 bg-gray-100 rounded-md relative lg:mt-80">
      <BarLoader isLoading={register?.isLoading} />
      <h2 className="font-bold text-xl text-center text-gray-700">Sign Up</h2>
      <div className={`devider mt-2 mb-4`}></div>
      <div className="w-[100%]">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.firstName && formik.errors.firstName ? (
              <ErrorMessage
                message={formik.errors.firstName}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}

            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="First Name"
                className={`textInput ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.lastName && formik.errors.lastName ? (
              <ErrorMessage
                message={formik.errors.lastName}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}

            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Last Name"
                className={`textInput ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage
                message={formik.errors.email}
                arrowDir="down"
                position={isLG ? "left" : ""}
              />
            ) : null}

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email Address"
                className={`textInput ${
                  formik.touched.email && formik.errors.email
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage
                message={formik.errors.password}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                className={`textInput ${
                  formik.touched.password && formik.errors.password
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500 text-md">Date Of Birth</span>
              <QuestionMarkCircleIcon className="w-5 text-gray-500" />
            </div>
            <div className="flex justify-around mt-2">
              <select
                name="bDay"
                id="bDay"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="lg:w-24 w-22 rounded-lg text-md border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {days.map((day, index) => (
                  <option value={day} key={index}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                name="bMonth"
                id="bDbMonthay"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="lg:w-24 w-22 rounded-lg text-md border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {months.map((month, index) => (
                  <option value={month} key={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="bYear"
                id="bYear"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="lg:w-24 w-22 rounded-lg text-md border-gray-500 text-gray-500 font-semibold ring-0 border-2"
              >
                {years.map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500 text-md">Select Gender</span>
              <QuestionMarkCircleIcon className="w-5 text-gray-500" />
            </div>
            <div className="flex justify-around">
              <label
                htmlFor="male"
                className="border-gray-500 lg:w-24 w-22 px-2 py-2 rounded-lg border-2 text-gray-500
                text-md flex items-center justify-between"
              >
                male
                <input
                  className="bg-gray-200 border-2 focus-ring-0"
                  name="gender"
                  id="male"
                  type="radio"
                  value="male"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </label>
              <label
                htmlFor="female"
                className="border-gray-500 lg:w-24 w-22 px-2 py-2 rounded-lg border-2 text-gray-500
                text-md flex items-center justify-between"
              >
                female
                <input
                  className="bg-gray-200 border-2 focus-ring-0"
                  name="gender"
                  id="female"
                  type="radio"
                  value="female"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </label>
              <label
                htmlFor="custom"
                className="border-gray-500 lg:w-24 w-22 px-2 py-2 rounded-lg border-2 text-gray-500
                text-md flex items-center justify-between"
              >
                custom
                <input
                  className="bg-gray-200 border-2 focus-ring-0"
                  name="gender"
                  id="custom"
                  type="radio"
                  value="custom"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </label>
            </div>
          </div>
          <p className="text-sm p-2 text-gray-500">
            People who use our service may have uploaded your contact
            information to Facebook.
            <span className="text-blue-500"> Learn more.</span>
            <br />
            <br /> By clicking Sign Up, you agree to our{" "}
            <span className="text-blue-500">Terms.</span> Learn how we collect,
            use and share your data in ourTerms.
            <span className="text-blue-500"> Privacy Policy</span> and how we
            use cookies and similar technology in our{" "}
            <span className="text-blue-500">Cookies Policy.</span> You may
            receive SMS Notifications from us and can opt out any time.
          </p>
          {register?.errorMessage ? (
            <div className="text-red-800 text text-center text-md">
              {register.errorMessage}
            </div>
          ) : null}
          <div className="text-center">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="green-btn disabled:cursor-not-allowed disabled:opacity-70 w-full"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="block text-center text-blue-700 text-lg hover:underline p-6"
        >
          I have an Acount!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

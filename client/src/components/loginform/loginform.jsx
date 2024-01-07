import { useFormik } from "formik";
import useScreenSize from "../../hooks/scrennsize.js";
import ErrorMessage from "../errormessage.jsx";
import * as Yup from "yup";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "../../redux/actions/login.js";
import BarLoader from "../ui/barloader.jsx";

const LoginForm = () => {
  const { isLG } = useScreenSize();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Please Enter your email address.")
      .email("The email does not have a valid format."),
    password: Yup.string().required("Please enter your password."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      dispatch(loginAction(values.email, values.password));
    },
  });

  return (
    <div
      className={`${
        !isLG ? "w-20" : ""
      }"shadow-md p-4 bg-gray-100 rounded-md relative"`}
    >
      <BarLoader isLoading={user?.isLoading} />
      <div className="w-[100%]">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage
                message={formik.errors.email}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}

            <div className="relative">
              <input
                id="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`textInput ${
                  formik.touched.email && formik.errors.email
                    ? "ring-red-400"
                    : ""
                }`}
                type="email"
                name="email"
                placeholder="Email Address"
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
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`textInput ${
                  formik.touched.password && formik.errors.password
                    ? "ring-red-400"
                    : ""
                }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="blue-btn disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            Login
          </button>
          {user?.errorMessage ? (
            <div className="text-red-800 text text-center text-md">
              {user.errorMessage}
            </div>
          ) : null}
        </form>
        <Link
          to="/reset"
          className="block text-center text-blue-700 text-lg hover:underline p-6"
        >
          Forgatten password?
        </Link>

        <div className="devider"></div>
        <div className="flex justify-center items-center p-4 mt-4">
          <Link to="/register">
            <button className="green-btn">Create New Acount</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/scrennsize";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  resetPasswordChangeAction,
  resetPasswordCancel,
} from "../../redux/actions/resetpasswordaction";
import ErrorMessage from "../errormessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import BLoader from "../ui/barloader";

const ChangePassword = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLG } = useScreenSize();

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required(
        "The password must be a combination of uppercase and lowercase English letters, numbers and special characters such as(!,@,#,$,%,^,&,*)"
      )
      .min(8, "Password must be 8 chracters")
      .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/, "Password week"),
    confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Password not match")
  });

  const formik = useFormik({
    initialValues: { password: "" , confirmPassword: ""},
    validationSchema: passwordValidation,
    onSubmit: (values) => {
      dispatch(
        resetPasswordChangeAction(
          resetPassword?.email,
          values.password,
          resetPassword?.code
        )
      );
    },
  });

  const handleCancel = () => {
    dispatch(resetPasswordCancel());
    setVisible(1);
    navigate("/login");
  };

  

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-[320px] sm:w-[380px] xl:w-[500px] lg:w-[400px]">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 py-2 px-4">Change Password</h3>
      <div className="devider"></div>
      <p className="p-4 text-md text-gray-800">Pick a strong password</p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage
                className="w-28"
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
                placeholder="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
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
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.confirmPassword}
                position={isLG ? "right" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className={`textInput ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <ExclamationCircleIcon className="errorInfo" />
              ) : null}
            </div>
          </div>
          {resetPassword?.errorMessage && (
            <div className="text-red-600 font-semibold text-center p-2">
              {resetPassword.errorMessage}
            </div>
          )}
          <div className="devider"></div>

          <div className="flex space-x-10 items-center justify-around">
            <Link
              onClick={handleCancel}
              to="/login"
              className="py-2 px-4 bg-gray-400 hover:bg-gray-500 text-gray-800 rounded-lg
              transition-colors shadow-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors
            shadow-blue-300 shadow-md text-gray-100 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:hover:bg-blue-300"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

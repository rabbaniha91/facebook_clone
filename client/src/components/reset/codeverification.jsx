import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/scrennsize";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  resetCodeAction,
  resetPasswordCancel,
} from "../../redux/actions/resetpasswordaction";
import { useEffect } from "react";
import ErrorMessage from "../errormessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import BLoader from "../ui/barloader";

const CodeVerification = ({ setVisible }) => {
  const resetPassword = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLG } = useScreenSize();

  const codeValidation = Yup.object({
    code: Yup.string().required("Code should not be empty"),
  });

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: codeValidation,
    onSubmit: (values) => {
      dispatch(resetCodeAction(resetPassword?.email ,values.code));
    },
  });

  const handleCancel = () => {
    dispatch(resetPasswordCancel());
    setVisible(1);
    navigate("/login");
  };

  useEffect(() => {
    if (resetPassword?.code) {
      setVisible(4);
    }
  }, [resetPassword?.code, setVisible]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {resetPassword?.isLoading && <BLoader isLoading={true} />}
      <h3 className="text-xl text-gray-800 py-2 px-4">Code Verification</h3>
      <div className="devider"></div>
      <p className="p-4 text-md text-gray-800">
        Please enter code that been sent to your email
      </p>
      <div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className={`${isLG ? "" : "space-y-4"} relative`}>
            {formik.touched.code && formik.errors.code ? (
              <ErrorMessage
                className="w-28"
                message={formik.errors.code}
                position={isLG ? "left" : ""}
                arrowDir="down"
              />
            ) : null}
            <div className="relative">
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Enter code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
                className={`textInput ${
                  formik.touched.code && formik.errors.code
                    ? "ring-red-400"
                    : ""
                }`}
              />
              {formik.touched.code && formik.errors.code ? (
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
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeVerification;

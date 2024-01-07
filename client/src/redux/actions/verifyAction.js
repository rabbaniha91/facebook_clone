import {
  VERIFY_ACCOUNT,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from "./type";

const verifyAction = (token, axiosPrivate) => async (dispatch) => {
  const cotroller = new AbortController();

  try {
    dispatch({ type: VERIFY_REQUEST });
    await axiosPrivate.post(
      "user/activate",
      { token },
      {
        signal: cotroller.signal,
      }
    );
    dispatch({ type: VERIFY_ACCOUNT, payload: { verified: true } });
    dispatch({ type: VERIFY_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = error?.response?.data?.message;
    }

    if (error?.code !== "ERR_CANCELED") {
      dispatch({ type: VERIFY_FAIL, payload: { errorMessage } });
    }
  }
};

export default verifyAction;

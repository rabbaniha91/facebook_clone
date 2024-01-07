import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "./type.js";
import axios from "../../axios/axios.js";

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

  await axios.post(
      "/user/register",
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    console.log(error);
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else if (error?.response?.status === 400) {
      errorMessage = error?.response?.data?.message;
    } else {
      errorMessage = "Error in regitration. Please try again.";
    }
console.log(errorMessage);
    dispatch({
      type: REGISTER_FAIL,
      payload: { errorMessage: errorMessage },
    });
  }
};

export default register;

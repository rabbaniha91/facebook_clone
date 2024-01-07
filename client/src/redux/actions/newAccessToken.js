import {
  REFRESH_ACCESSTOKEN,
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
} from "./type.js";
import axios from "../../axios/axios.js";

const newAccessTokenAction = () => async (dispatch) => {
  try {
    dispatch({ type: ACCESSTOKEN_REQUEST });

    const response = await axios.get("/user/refresh", {
      withCredentials: true,
    });


    dispatch({
      type: REFRESH_ACCESSTOKEN,
      payload: {
        accessToken: response.data.accessToken,
        userInfo: response.data.userInfo,
      },
    });

    dispatch({ type: ACCESSTOKEN_SUCCESS });
  } catch (error) {
    let errorMessage = "";
    if (!error?.response) {
      errorMessage = "Server not respond";
    } else {
      errorMessage = "Invalid refresh token";
    }

    dispatch({
      type: ACCESSTOKEN_FAIL,
      payload: {
        errorMessage: errorMessage,
      },
    });
  }
};

export default newAccessTokenAction;

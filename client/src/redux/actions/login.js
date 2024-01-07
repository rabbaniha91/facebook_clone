import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "./type.js";
import axios from "../../axios/axios.js";

const login = (email, password) => async (dispatch) => {
  // try {
  //   dispatch = {
  //     type: LOGIN_REQUEST,
  //   };

  //   const responce = await axios.post(
  //     "/user/auth",
  //     { email, password },
  //     {
  //       headers: {
  //         "Cntent-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     }
  //   )

  //   dispatch = {
  //     type: LOGIN_SUCCESS,
  //     payload: {
  //       accessToken: responce?.data?.accessToken,
  //       userInfo: responce?.data?.userInfo,
  //     },
  //   };
  // } catch (error) {

  //   let errorMsg = "";

  //   if (!error?.responce) {
  //     errorMsg = "Server not respond!";
  //   } else if (error.responce?.status === 400) {
  //     errorMsg = "Invalid email or password!";
  //   } else if (error.responce?.status === 401) {
  //     errorMsg = "Email or Password is incorrect!";
  //     console.log(errorMsg);
  //   } else {
  //     errorMsg = "Error in login. Please try again!";
  //   }

  //   dispatch = { type: LOGIN_FAIL, payload: { errorMsg } };
  // }

  dispatch({
    type: LOGIN_REQUEST,
  });

  axios
    .post(
      "/user/auth",
      { email, password },
      {
        headers: {
          "Cntent-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: response?.data?.accessToken,
          userInfo: response?.data?.userInfo,
        },
      });
    })
    .catch((error) => {
      let errorMessage = "";

      if (!error?.response) {
        errorMessage = "Server not respond!";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid email or password!";
      } else if (error.response?.status === 401) {
        errorMessage = "Email or Password is incorrect!";
      } else {
        errorMessage = "Error in login. Please try again!";
      }

      dispatch({ type: LOGIN_FAIL, payload: { errorMessage: errorMessage } });
    });
};

export default login;

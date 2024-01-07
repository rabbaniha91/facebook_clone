import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from "./type";

const getProfileAction =
  (userName, axiosPrivate, abortSignal) => async (dispatch) => {
    try {
      dispatch({ type: GET_PROFILE_REQUEST });
      const { data } = await axiosPrivate.get(`/user/getProfile/${userName}`, {
        signal: abortSignal,
      });
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { profileInfo: data } });
    } catch (error) {
      if (abortSignal.aborted) return;
      let errorMessage = "";
      if (!error?.response?.data?.message) {
        errorMessage = "Server not respond";
      } else {
        errorMessage = error.response?.data?.message;
      }
      dispatch({ type: GET_PROFILE_FAIL, payload: { errorMessage } });
    }
  };

export default getProfileAction;

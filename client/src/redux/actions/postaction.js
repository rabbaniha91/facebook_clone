import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_FAIL,
  CLEAR_POST_INFO,
  ADD_NEW_POST
} from "./type";

export const postAction =
  (axiosPrivate, values, formData = null) =>
  async (dispatch) => {
    console.log(values);
    try {
      dispatch({ type: CLEAR_POST_INFO });
      if (formData) {
        dispatch({ type: UPLOAD_POST_IMAGE_REQUEST });
        var { data } = await axiosPrivate.post("/post/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch({
          type: UPLOAD_POST_IMAGE_SUCCESS,
          payload: { images: data?.images },
        });
      }
      dispatch({ type: CREATE_POST_REQUEST });
      let postData = { ...values };
      if (formData) {
        postData.images = data?.images || [];
      }
      const response = await axiosPrivate.post("/post/createPost", postData);
      console.log(response);
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: { ...postData },
      });
      dispatch({type: ADD_NEW_POST, payload:{post: response?.data}})
    } catch (error) {
      let errorMessage = "";
      if (!error?.response?.data) {
        errorMessage = "Server not respond";
      } else {
        errorMessage = error?.response?.data?.message;
      }

      dispatch({ type: CREATE_POST_FAIL, payload: { errorMessage } });
      dispatch({ type: UPLOAD_POST_IMAGE_FAIL, payload: { errorMessage } });
    }
  };

export const clearPostAction = () => async (dispatch) => {
    dispatch({type: CLEAR_POST_INFO})
}

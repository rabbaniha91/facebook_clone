import { CHANGE_PROFILE_PICTURE, CHANGE_USER_PICTURE } from "./type";

const setProfilePictureAction =
  (formData, axiosPrivate) => async (dispatch) => {
    try {
      const { data } = await axiosPrivate.post("/post/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      axiosPrivate.post("/user/profileUpdate", { url: data?.images[0]?.url });
      dispatch({
        type: CHANGE_USER_PICTURE,
        payload: { picture: data?.images[0]?.url },
      });
      dispatch({
        type: CHANGE_PROFILE_PICTURE,
        payload: { picture: data?.images[0]?.url },
      });
    } catch (error) {
        console.log(error)
    }
  };

export default setProfilePictureAction;

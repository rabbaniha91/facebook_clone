import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CHANGE_PROFILE_COVER,
  CHANGE_PROFILE_PICTURE,
  CHANGE_PROFILE_DETAILS,
} from "../actions/type";

const initialState = {
  isLoading: false,
  errorMessage: "",
  profileInfo: null,
};

const getProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE_REQUEST:
      return {
        isLoading: true,
        errorMessage: "",
        profileInfo: state?.profileInfo,
      };
    case GET_PROFILE_SUCCESS:
      return {
        isLoading: false,
        errorMessage: "",
        profileInfo: payload?.profileInfo,
      };
    case GET_PROFILE_FAIL:
      return {
        isLoading: false,
        errorMessage: payload?.errorMessage,
        profileInfo: state?.profileInfo,
      };
    case CHANGE_PROFILE_COVER:
      return {
        isLoading: false,
        errorMessage: "",
        profileInfo: {
          ...state.profileInfo,
          cover: payload?.cover,
        },
      };
    case CHANGE_PROFILE_PICTURE:
      return {
        isLoading: false,
        errorMessage: "",
        profileInfo: {
          ...state.profileInfo,
          profilPic: payload?.picture,
        },
      };
    case CHANGE_PROFILE_DETAILS:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          details: {
            ...state.profileInfo?.details,
            ...payload.details,
          },
        },
      };
    default:
      return state;
  }
};

export default getProfileReducer;

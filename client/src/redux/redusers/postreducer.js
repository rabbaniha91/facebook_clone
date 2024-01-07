import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_FAIL,
  CLEAR_POST_INFO,
} from "../actions/type";

const initialState = {
  isLoading: false,
  postInfo: {
    type: "",
    text: "",
    iamges: [],
    background: "",
  },
  errorMessage: null,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST_REQUEST:
    case UPLOAD_POST_IMAGE_REQUEST:
      return {
        isLoading: true,
        ...state,
        errorMessage: null,
      };
    case UPLOAD_POST_IMAGE_SUCCESS:
      return {
        isLoading: false,
        postInfo: {
          ...state.postInfo,
          images: payload.images,
        },
        errorMessage: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        isLoading: false,
        postInfo: {
          ...state.postInfo,
          ...payload,
        },
        errorMessage: null,
      };
    case CREATE_POST_FAIL:
    case UPLOAD_POST_IMAGE_FAIL:
      return {
        isLoading: false,
        ...state,
        errorMessage: payload.errorMessage,
      };
    case CLEAR_POST_INFO:
      return initialState;

    default:
      return state;
  }
};

export default postReducer

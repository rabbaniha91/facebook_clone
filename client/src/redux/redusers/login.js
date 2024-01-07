import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_ACCESSTOKEN,
  VERIFY_ACCOUNT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CHANGE_USER_PICTURE
} from "../actions/type.js";

const initialState = {
  accessToken: "",
  userInfo: null,
  isLoading: false,
  errorMessage: null,
};

function loginReduser(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        accessToken: payload.accessToken,
        userInfo: payload.userInfo,
        isLoading: false,
        errorMessage: null,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGIN_FAIL:
      return {
        accessToken: "",
        userInfo: null,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case REFRESH_ACCESSTOKEN:
      return {
        ...state,
        userInfo: payload.userInfo,
        accessToken: payload.accessToken,
      };
    case VERIFY_ACCOUNT:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          verified: payload.verified,
        },
      };
    case CHANGE_USER_PICTURE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          picture: payload?.picture,
        },
      };
    default:
      return state;
  }
}

export default loginReduser;

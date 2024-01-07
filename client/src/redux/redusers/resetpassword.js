import {
  RESET_SEARCH_REQUEST,
  RESET_SEARCH_SUCCESS,
  RESET_SEARCH_FAIL,
  RESET_EMAIL_REQUEST,
  RESET_EMAIL_SUCCESS,
  RESET_EMAIL_FAIL,
  RESET_CODE_REQUEST,
  RESET_CODE_SUCCESS,
  RESET_CODE_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWOR_CANCEL,
} from "../actions/type";

const initailState = {
  isLoading: false,
  email: "",
  picture: "",
  code: "",
  mailSuccess: false,
  errorMessage: null,
};

function resetPasswordReducer(state = initailState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESET_SEARCH_REQUEST:
    case RESET_EMAIL_REQUEST:
    case RESET_CODE_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        email: payload.email,
        picture: payload.picture,
        errorMessage: null,
      };
    case RESET_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mailSuccess: true,
        errorMessage: null,
      };
    case RESET_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        code: payload?.code,
      };
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWOR_CANCEL:
      return initailState;
    case RESET_SEARCH_FAIL:
    case RESET_EMAIL_FAIL:
    case RESET_CODE_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
}


export default resetPasswordReducer;

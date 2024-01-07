import {
  GET_MYPOST_REQUEST,
  GET_MYPOST_SUCCESS,
  GET_MYPOST_FAIL,
  GET_MYPOST_CLEAN,
  ADD_NEWMY_POST,
} from "../actions/type";

const initialState = {
  isLoading: false,
  posts: [],
  errorMessage: "",
  hasNextPage: false,
  nextPage: 1,
  totalPage: 0,
};

const myPostReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MYPOST_REQUEST:
      return {
        isLoading: true,
        ...state,
        errorMessage: "",
      };
    case GET_MYPOST_SUCCESS:
      return {
        isLoading: false,
        posts: [...state.posts, ...payload.posts],
        errorMessage: "",
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        totalPage: payload.totalPage,
      };
    case GET_MYPOST_FAIL:
      return {
        ...state,
        errorMessage: payload.errorMessage,
        isLoading: false,
      };
    case ADD_NEWMY_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case GET_MYPOST_CLEAN:
      return initialState;
    default:
      return state;
  }
};

export default myPostReducer;
